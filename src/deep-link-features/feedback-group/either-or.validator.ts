// Custom validator class
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator'

@ValidatorConstraint({ name: 'eitherOr', async: false })
export class EitherOrValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints
        const relatedValue = (args.object as any)[relatedPropertyName]
        if (value && relatedValue) {
            return false // Both fields are set, validation failed
        }
        if (!value && !relatedValue) {
            return false // Neither of the fields is set, validation failed
        }
        return true // One of the fields is set, validation passed
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints
        return `Either '${args.property}' or '${relatedPropertyName}' must be set, but not both.`
    }
}
