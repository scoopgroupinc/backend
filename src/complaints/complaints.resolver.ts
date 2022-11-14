import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ComplaintsService } from './complaints.service'
import { ComplaintsFilter } from './dto/complaint.filter'
import { ComplaintsInput } from './dto/complaints.input'
import { ComplaintsOutput } from './dto/complaints.output'
import { Complaints } from './entities/complaints.entity'

@Resolver(() => Complaints)
export class ComplaintsResolver {
    constructor(private complaintsService: ComplaintsService) {}

    // @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async saveNewCompliants(
        @Args('complaintsInput') complaintsInput: ComplaintsInput
    ): Promise<string> {
        return await this.complaintsService.saveNewCompliants(complaintsInput)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async updateComplaint(
        @Args('complaintsInput') complaintsInput: ComplaintsInput
    ): Promise<string> {
        return await this.complaintsService.updateComplaint(complaintsInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [ComplaintsOutput])
    async getAllOpenComplaints(
        @Args('complaintsFilter') complaintsFilter: ComplaintsFilter
    ): Promise<ComplaintsOutput[]> {
        return await this.complaintsService.getAllOpenComplaints(
            complaintsFilter
        )
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => ComplaintsOutput)
    async getAComplaint(
        @Args('complaintId') complaintId: string
    ): Promise<ComplaintsOutput> {
        return await this.complaintsService.findOne(complaintId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async closeComplaints(
        @Args('complaintId') complaintId: string
    ): Promise<string> {
        return await this.complaintsService.closeComplaint(complaintId)
    }
}
