export class MessageDTO {
    id: number
    createdAt?: Date
    senderId?: number
    recieverId?: number
    content?: string
    sentAt?: string
    mediaFile?: string
    deletedAt?: Date
    type: string
}
