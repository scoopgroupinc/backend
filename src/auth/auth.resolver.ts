import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { AuthService } from './auth.service'

export class AuthResolver {
    constructor(private authService: AuthService) {}
}
