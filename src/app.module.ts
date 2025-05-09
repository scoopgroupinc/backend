import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { join } from 'path'
import * as configs from 'config'
import { config } from './config/config'
import { UserModule } from './user/user.module'
import { AppleModule } from './auth/apple/apple.module'
import { AuthModule } from './auth/auth.module'
import { UserProfileModule } from './user-profile/user-profile.module'
import { LocationModule } from './location/location.module'
import { UserPreferenceModule } from './user-preference/user-preference.module'
import { TagsModule } from './tags/tags.module'
import { RatingModule } from './rating/rating.module'
import { RatingCommentModule } from './rating-comment/rating-comment.module'
import { RatingGroupModule } from './rating-group/rating-group.module'
import { RateCriteriasModule } from './rate-criterias/rate-criterias.module'
import { PromptsModule } from './prompts/prompts.module'
import { UserPromptsModule } from './user-prompts/user-prompts.module'
import { ComplaintsModule } from './complaints/complaints.module'
import { MatchesModule } from './matches/matches.modules.'
import { UserChoiceModule } from './user-choice/user-choice.module'
import { MetaDetailsModule } from './meta-details/meta.module'
import { FeedBackModule } from './feedback/feedback.module'
import { BlockedUserModule } from './blocked-users/blocked-users.module'
import { UserTagsTypeVisibleModule } from './user-tags-type-visible/user-tags-type-visible.module'
import { GroupCodesModule } from './group-code/group-code.module'
import { FeedbackGroupModule } from './deep-link-features/feedback-group/feedback-group.module'
import { ProfileFeedbackModule } from './deep-link-features/feedback-group/profile-feedback/profile-feedback.module'
import { PersonalityFeedbackModule } from './deep-link-features/feedback-group/personality-feedback/personality-feedback.module'
import { UserLinkModule } from './deep-link-features/user-link/user-link.module'
import { UserVisualsModule } from './user-profile/user-visuals/user-visuals.module'

const { user, pass, host, port } = configs.get('mail')
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
            playground: true,
            introspection: true,
            driver: ApolloDriver,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('database'),
        }),
        MailerModule.forRoot({
            // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
            transport: {
                host,
                port,
                ignoreTLS: true,
                secure: true,
                auth: {
                    user,
                    pass,
                },
            },
            defaults: {
                from: `"Scoop Love" ${user}`,
            },
            template: {
                dir: __dirname + '/templates/',
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                },
            },
        }),
        AppleModule,
        AuthModule,
        UserModule,
        UserProfileModule,
        UserVisualsModule,
        UserPreferenceModule,
        LocationModule,
        TagsModule,
        RatingModule,
        RatingCommentModule,
        RatingGroupModule,
        RateCriteriasModule,
        PromptsModule,
        UserPromptsModule,
        ComplaintsModule,
        MatchesModule,
        UserChoiceModule,
        MetaDetailsModule,
        FeedBackModule,
        BlockedUserModule,
        UserTagsTypeVisibleModule,
        GroupCodesModule,
        FeedbackGroupModule,
        ProfileFeedbackModule,
        PersonalityFeedbackModule,
        UserLinkModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
