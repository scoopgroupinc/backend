/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "./entities/rating.entity";
import { RatingResolver } from "./rating.resolver";
import { RatingService } from "./rating.service";
import { RatingCommentModule } from "src/rating-comment/rating-comment.module";
import { RateCriteriasModule } from "src/rate-criterias/rate-criterias.module";
import { RatingGroupModule } from "../rating-group/rating-group.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Rating]),
        forwardRef(() => RatingCommentModule),
        forwardRef(() => RateCriteriasModule),
        forwardRef(() => RatingGroupModule),
    ],
    providers: [
        RatingResolver,
        RatingService,
    ],
    exports: [
        RatingService
    ]
})
export class RatingModule { }