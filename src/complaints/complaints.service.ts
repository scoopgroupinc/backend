import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ComplaintsInput } from './dto/complaints.input'
import { ComplaintsOutput } from './dto/complaints.output'
import { Complaints } from './entities/complaints.entity'

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectRepository(Complaints)
        private complaintsRepository: Repository<Complaints>
    ) {}

    async saveNewCompliants(
        complaintsInput: ComplaintsInput
    ): Promise<ComplaintsOutput> {
        return await this.complaintsRepository.save(complaintsInput)
    }

    async updateComplaint(complaintsInput: ComplaintsInput): Promise<any> {
        const { id } = complaintsInput
        const complaint = await this.findOne(id)
        if (!complaint)
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        return await this.complaintsRepository.save({
            ...complaint,
            ...complaintsInput,
        })
    }

    async getAllOpenComplaints(): Promise<ComplaintsOutput[]> {
        return await this.complaintsRepository.find({ isClosed: false })
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
