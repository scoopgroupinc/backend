import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { lastValueFrom } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserVisuals } from './user-visuals.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserVisualsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    async getVisualsByUserId(userId: string): Promise<UserVisuals[]> {
        const request = this.httpService
            .get(
                `${this.configService.get('fileServer_Url')}/visuals/${userId}`
            )
            .pipe(
                map((response: AxiosResponse<UserVisuals[]>) => response.data)
            )

        return await lastValueFrom(request)
    }
}
