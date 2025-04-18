/* eslint-disable prettier/prettier */
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { TagsInput } from './dto/tags.input'
import { Repository } from 'typeorm'
import { TagsEntity } from './entities/tags.entity'
import { InjectRepository } from '@nestjs/typeorm'
import readXlsxFile from 'read-excel-file/node'
import * as path from 'path'
import logger from 'src/utils/logger'

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagsEntity)
        private tagsRepository: Repository<TagsEntity>
    ) {}

    async saveTag(tagInput: TagsInput) {
        try {
            const { id } = tagInput
            const tag = await this.findOne(id)

            if (tag) return await this.updateTag(tagInput)
            return await this.createTag(tagInput)
        } catch (error) {
            logger.debug(error)
            return error
        }
    }

    async createTag(tagInput: TagsInput): Promise<any> {
        return await this.tagsRepository.create(tagInput)
    }

    async findOne(id: string): Promise<TagsEntity> {
        return await this.tagsRepository.findOne({ id })
    }

    async findAll(): Promise<TagsEntity[]> {
        const result = await this.tagsRepository.find({})
        return result
    }

    async getTags(tagType: string): Promise<TagsEntity[]> {
        if (tagType === 'all' || tagType === '') return await this.findAll()

        return await this.getTagsbyType(tagType)
    }

    async updateTag(tagInput: TagsInput): Promise<any> {
        const { id } = tagInput
        const tag = await this.findOne(id)
        if (!tag) return new NotFoundException('Not Found')
        return await this.tagsRepository.save({ ...tag, ...tagInput })
    }

    async getTagsbyType(tagType: string): Promise<TagsEntity[]> {
        const result = await this.tagsRepository.find({ type: tagType })
        return result
    }

    async uploadTags() {
        const filePath = path.resolve('dist/tags.xlsx')

        let process = 'Upload successful'

        readXlsxFile(filePath, { sheet: 'tags' }).then(async (rows) => {
            rows.shift()

            const tags = []
            rows.forEach((row) => {
                const tag = {
                    id: row[0],
                    type: row[1],
                    name: row[2],
                    order: row[3],
                    visible: row[4],
                    emoji: row[5],
                }

                tags.push(tag)
            })

            try {
                for (const tag of tags) {
                    const existingTag = await this.tagsRepository.findOne(
                        tag.id
                    )
                    if (existingTag) {
                        await this.tagsRepository.update(tag.id, tag)
                        process = 'Update successful'
                    } else {
                        await this.tagsRepository.insert(tag)
                    }
                }
            } catch (error) {
                throw new HttpException(
                    'Upload failed',
                    HttpStatus.EXPECTATION_FAILED
                )
            }
        })

        return process
    }
}
