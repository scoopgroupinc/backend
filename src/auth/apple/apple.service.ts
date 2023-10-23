import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { map } from 'rxjs/operators'
import * as jwt from 'jsonwebtoken' // Import the jsonwebtoken library.
import * as jwkToPem from 'jwk-to-pem'

@Injectable()
export class AppleService {
    constructor(private httpService: HttpService) {}

    async getAppleKeys(): Promise<{ [key: string]: any }> {
        const appleKeysUrl = 'https://appleid.apple.com/auth/keys'

        // Fetch the keys and transform them in one go
        const keysArray = await this.httpService
            .get(appleKeysUrl)
            .pipe(
                map((response) => response.data.keys) // extract the keys from the response
            )
            .toPromise()

        // Transform the array into an object
        const keysObject: { [key: string]: any } = {}
        keysArray.forEach((key) => {
            keysObject[key.kid] = key
        })

        return keysObject
    }
    /**
     * Verifies the token with Apple's public keys.
     * @param token JWT from Apple
     */
    async verifyAppleJwt(token: string): Promise<any> {
        try {
            const appleKeys = await this.getAppleKeys()

            // Decode the token to get the kid
            const unverifiedToken = jwt.decode(token, { complete: true })
            if (
                !unverifiedToken ||
                typeof unverifiedToken === 'string' ||
                !unverifiedToken.header
            ) {
                throw new HttpException(
                    'Invalid token.',
                    HttpStatus.BAD_REQUEST
                )
            }

            const kid = unverifiedToken.header.kid
            const appleKey = appleKeys[kid]

            if (!appleKey) {
                throw new HttpException(
                    'Key not found.',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }

            // Convert the JWK to a PEM
            const pem = jwkToPem(appleKey)

            // Verify the token using the PEM
            const verifiedToken = jwt.verify(token, pem, {
                algorithms: ['RS256'],
            })

            return verifiedToken
        } catch (error) {
            // Handle errors
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }
}
