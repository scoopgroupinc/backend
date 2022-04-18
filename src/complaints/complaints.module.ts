import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ComplaintsResolver } from './complaints.resolver'
import { ComplaintsService } from './complaints.service'
import { Complaints } from './entities/complaints.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Complaints]), AuthModule],
    providers: [ComplaintsResolver, ComplaintsService],
    exports: [],
})
export class ComplaintsModule {}
