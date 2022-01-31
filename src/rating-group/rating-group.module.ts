import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingCommentModule } from 'src/rating-comment/rating-comment.module';
import { RatingModule } from 'src/rating/rating.module';
import { RatingGroup } from './entities/rating-group.entity';
import { RatingGroupService } from './rating-group.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RatingGroup]),
        forwardRef(() => RatingModule),
        forwardRef(() => RatingCommentModule),
    ],
    providers: [RatingGroupService],
    exports: [RatingGroupService],
})
export class RatingGroupModule { }
