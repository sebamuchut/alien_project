import { getConnection } from 'typeorm';
import MessageRepo from '../domain/Message';
import { Context } from 'koa';
import getDangerMessagesByLeader from '../service/getDangerMessages';

export async function saveMessage (messageToSave: object, ctx: Context, id?: string) {
    
    await getConnection().getRepository(MessageRepo).save(messageToSave)
    
    if (id) {
        ctx.body = {action: 'replacing message', status: 'success', isValid: true, newMessage: messageToSave}
        ctx.body && ctx.body.message.type.value === 'DANGER' && getDangerMessagesByLeader(ctx.body.message.leader)
    } else {
        ctx.body = {status: 'success', isValid: true, message: messageToSave}
        ctx.body && ctx.body.message.type.value === 'DANGER' && getDangerMessagesByLeader(ctx.body.message.leader)
    }
    return ctx.body

}
