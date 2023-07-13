import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-apple'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AppleAuthStrategy extends PassportStrategy(Strategy, 'apple') {
    constructor() {
        super({
            clientID: 'com.scoop.love.login',
            teamID: 'YL98TK49UQ',
            callbackURL: 'http://localhost:4000/auth/apple/callback',
            keyID: 'keyID',
            privateKeyLocation: './keys/AuthKey_keyID.p8',
            passReqToCallback: true,
        })
    }

    userSvc: UserService

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
    ) {
        try {
            const user = await this.userSvc.findOrCreateUserWithApple(profile)
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
}
