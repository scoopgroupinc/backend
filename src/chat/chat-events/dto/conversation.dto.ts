import { User } from '../../../user/entities/user.entity'

export class ConversationDTO {
    id?: number
    users?: User[]
    socketId?: string
    lastUpdated?: Date
    isDeleted?: Boolean
    messages?: any
}
