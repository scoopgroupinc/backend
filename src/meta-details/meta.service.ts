import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MetaDetails } from './entities/meta.entity'

@Injectable()
export class MetaDetailsService {
    constructor(
        @InjectRepository(MetaDetails)
        private metaDetailsRepository: Repository<MetaDetails>
    ) {}

    async getMetaDetails() {}

    async updateDetials(){
        
    }
}
