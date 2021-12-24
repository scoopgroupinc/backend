export class ConversationDTO{
    id?:number;
    // users?: User[];
    socket_id?:string;
    lastUpdated?:Date;
    isDeleted?:Boolean;
    messages?:any
}