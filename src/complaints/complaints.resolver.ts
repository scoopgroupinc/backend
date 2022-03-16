import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ComplaintsService } from './complaints.service'
import { ComplaintsInput } from './dto/complaints.input'
import { ComplaintsOutput } from './dto/complaints.output'
import { Complaints } from './entities/complaints.entity'

@Resolver(() => Complaints)
export class ComplaintsResolver {
    constructor(private complaintsService: ComplaintsService) {}

    @Mutation(() => ComplaintsOutput)
    async saveNewCompliants(
        @Args('complaintsInput') complaintsInput: ComplaintsInput
    ): Promise<ComplaintsOutput> {
        return await this.complaintsService.saveNewCompliants(complaintsInput)
    }

    @Mutation(() => ComplaintsOutput)
    async updateComplaint(
        @Args('complaintsInput') complaintsInput: ComplaintsInput
    ): Promise<ComplaintsOutput> {
        return await this.complaintsService.updateComplaint(complaintsInput)
    }

    @Query(() => [ComplaintsOutput])
    async getAllOpenComplaints(): Promise<ComplaintsOutput[]> {
        return await this.complaintsService.getAllOpenComplaints()
    }

    @Query(() => ComplaintsOutput)
    async getAComplaint(
        @Args('complaintId') complaintId: string
    ): Promise<ComplaintsOutput> {
        return await this.complaintsService.findOne(complaintId)
    }
}
