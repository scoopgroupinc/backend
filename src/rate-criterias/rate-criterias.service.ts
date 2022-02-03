/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RateCriterias } from "./entities/rate-criterias.entity";
import readXlsxFile from 'read-excel-file/node';
import * as path from 'path';

@Injectable()
export class RateCriteriasService {
    constructor(
        @InjectRepository(RateCriterias)
        private rateCiteriasRepository: Repository<RateCriterias>
    ) { }

    async getRatingCriteriaById(criteriaId: string): Promise<RateCriterias> {
        return await this.rateCiteriasRepository.findOne({ criteriaId });
    }

    async getRatingCriteriaByType(criteriaType: string): Promise<RateCriterias[]> {
        if (criteriaType === 'all' || criteriaType === '') return await this.getAllCriterias();
        return await this.rateCiteriasRepository.find({ type: criteriaType });
    }

    async getAllCriterias(): Promise<RateCriterias[]> {
        return await this.rateCiteriasRepository.find({});
    }


    async uploadCriterias(): Promise<any> {
        const allCriterias = await this.getAllCriterias();
        if (allCriterias.length > 0) throw new HttpException('Criterias already uploaded', HttpStatus.FORBIDDEN);
        const filePath = path.resolve('dist/tags.xlsx');
        readXlsxFile(filePath, { sheet: 'criterias' }).then(async rows => {
            rows.shift();

            const criterias = []
            rows.forEach((row) => {

                const criteria = {
                    title: row[0],
                    description: row[1],
                    type: row[2],
                    criteriaId: row[3].toString()
                };

                criterias.push(criteria);
            });

            await this.rateCiteriasRepository.create(criterias);
            const result = await this.rateCiteriasRepository.save(criterias);
            if (!result) throw new HttpException('upload failed', HttpStatus.BAD_REQUEST);
        })
        return 'upload successful';
    }


}