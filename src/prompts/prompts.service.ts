/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { PromptsInput } from './dto/prompts.input'
import { Prompts } from './entities/prompts.entity'
import readXlsxFile from 'read-excel-file/node'
import * as path from 'path'

@Injectable()
export class PromptsService {
    constructor(
        @InjectRepository(Prompts)
        private promptsRepository: Repository<Prompts>
    ) {}

    async getPrompts(promptType: string, id: string): Promise<Prompts[]> {
        if ((promptType === 'all' || promptType === '') && id === '') {
            return this.findAll()
        }
        if (promptType !== '' && id === '') {
            return await this.getPromptType(promptType)
        }
        const prompt = await this.findOne(id)
        return [prompt]
    }

    async findOne(id: string): Promise<Prompts> {
        return await this.promptsRepository.findOne({ id })
    }

    async findMany(promptIds: string[]): Promise<Prompts[]>{
        return await this.promptsRepository.find({ id: In(promptIds)})
    }

    async findAll(): Promise<Prompts[]> {
        return await this.promptsRepository.find({})
    }

    async getPromptType(promptType: string): Promise<Prompts[]> {
        return await this.promptsRepository.find({ type: promptType })
    }

    async uploadPrompts(promptType: string) {
        const allPrompts = await this.getPrompts(promptType, '')
        if (allPrompts.length > 0) {
            throw new HttpException(
                'Prompts already uploaded',
                HttpStatus.FORBIDDEN
            )
        }

        const filePath = path.resolve('dist/tags.xlsx')
        const sheetNames = {
            prompts: 'prompts',
            photo_prompts: 'photo_prompts',
        }
       
        for (const sheet in sheetNames ){
        readXlsxFile(filePath, { sheet }).then(async (rows) => {
            rows.shift()

            const prompts = []
            rows.forEach((rows) => {
                const prompt = {
                    prompt: rows[0],
                    sample_answer: rows[1],
                    type: sheet==='photo_prompts'?'visual_prompts':sheet,
                }
                prompts.push(prompt)
            })

            await this.promptsRepository.create(prompts)
            const result = await this.promptsRepository.save(prompts)
            if (!result)
                throw new HttpException(
                    'Upload failed',
                    HttpStatus.EXPECTATION_FAILED
                )
        })
     }
        return 'Upload successful'
    }

    async addNewPrompt(promptInput: PromptsInput): Promise<any> {
        return await this.promptsRepository.save(promptInput)
    }
}
