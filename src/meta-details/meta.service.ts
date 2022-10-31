import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MetaDetailsInput } from './dto/meta.input'
import { MetaDetails } from './entities/meta.entity'

@Injectable()
export class MetaDetailsService {
    constructor(
        @InjectRepository(MetaDetails)
        private metaDetailsRepository: Repository<MetaDetails>
    ) {}

    async createMetaDetails(metaDetailsInput: MetaDetailsInput) {
        return await this.metaDetailsRepository.save(metaDetailsInput)
    }
    async getMetaDetails() {
        return await this.metaDetailsRepository.findOne({})
    }

    async updateDetails(metaDetailsInput: MetaDetailsInput) {
        const result = await this.metaDetailsRepository.findOne({})
        return await this.metaDetailsRepository.save({
            ...result,
            ...metaDetailsInput,
        })
    }
}
