import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom, map } from 'rxjs'
import { BlockUserService } from 'src/blocked-users/blocked-users.service'
import { Repository } from 'typeorm'
import { ComplaintsInput } from './dto/complaints.input'
import { ComplaintsOutput } from './dto/complaints.output'
import { Complaints, complaint_type } from './entities/complaints.entity'

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectRepository(Complaints)
        private complaintsRepository: Repository<Complaints>,
        private httpService: HttpService,
        private blockedUserService: BlockUserService
    ) {}

    async saveNewCompliants(complaintsInput: ComplaintsInput): Promise<string> {
        if (complaintsInput.reason === complaint_type.block_user) {
            await this.blockedUserService.blockUser({
                blockedUserId: complaintsInput.accusedId,
                blockerId: complaintsInput.reporterId,
            })
        }
        await this.complaintsRepository.save(complaintsInput)
        return 'success'
    }

    async updateComplaint(complaintsInput: ComplaintsInput): Promise<string> {
        const { id } = complaintsInput
        const complaint = await this.findOne(id)
        if (!complaint)
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        await this.complaintsRepository.save({
            ...complaint,
            ...complaintsInput,
        })
        return 'updated'
    }

    async getAllOpenComplaints(): Promise<ComplaintsOutput[]> {
        const complaints = await this.complaintsRepository.find({
            isClosed: false,
        })
        const response: ComplaintsOutput[] = []
        for (const comps of complaints) {
            if (comps?.media_file) {
                comps.media_file = await lastValueFrom(
                    this.httpService
                        .get(comps.media_file)
                        .pipe(map((response) => response.data))
                )
            }
            response.push(comps)
        }
        return response
    }

    async closeComplaint(complaintId: string): Promise<any> {
        const complaint = await this.findOne(complaintId)
        if (!complaint)
            throw new HttpException('complaint not found', HttpStatus.NOT_FOUND)
        await this.complaintsRepository.save({
            ...complaint,
            isClosed: true,
        })
        return 'complaint closed'
    }

    async findOne(id: string): Promise<ComplaintsOutput> {
        return await this.complaintsRepository.findOne({ id, isClosed: false })
    }
}
