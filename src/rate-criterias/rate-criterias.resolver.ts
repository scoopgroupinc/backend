/* eslint-disable prettier/prettier */
import { Resolver, Query, Args } from '@nestjs/graphql';
import { RateCriterias } from './entities/rate-criterias.entity';
import { RateCriteriasService } from './rate-criterias.service';

@Resolver(() => RateCriterias)
export class RateCriteriasResolver {
    constructor(private rateCriteriaService: RateCriteriasService) { }

    @Query(() => RateCriterias, {
        name: 'getspecificTag',
        description: 'fetch a tag',
    })
    async getRatingCriteriaById(
        @Args('criteriaId') criteriaId: string,
    ): Promise<RateCriterias> {
        return await this.rateCriteriaService.getRatingCriteriaById(criteriaId);
    }

    @Query(() => [RateCriterias], {
        description: `Filter by: all,"", user_prompts and visual_prompts. 
    Passing all or an empty string as parameter will fetch all criterias
       tags. To filter particular criterias of type, pass the type as a parameter `,
    })
    async getCriterias(
        @Args('criteriaType') criteriaType: string,
    ): Promise<RateCriterias[]> {
        return await this.rateCriteriaService.getRatingCriteriaByType(criteriaType);
    }

    @Query(() => Boolean)
    async uploadCriterias() {
        return await this.rateCriteriaService.uploadCriterias();
    }
}
