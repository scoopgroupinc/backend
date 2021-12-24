
export class MessageDTO{
    id:number;
    created_at?:Date;
    sender_id?:number;
    reciever_id?:number;
    content?:string;
    sent_at?:string;
    media_file?:string;
    deleted_at?:Date;
    type:string;
}