import { Context } from 'koa';
import { getRepository } from 'typeorm';
import invalidMessageRepo from '../domain/InvalidMessage';

export async function saveFalseMessage (falseMessage: object, ctx: Context) {
    try {
     const createdMessage = await getRepository(invalidMessageRepo).create(falseMessage)
     await getRepository(invalidMessageRepo).save(createdMessage)
     ctx.body = {status: 'success', isValid: false, message: createdMessage}
     return ctx.body
    } catch (error) {  
        console.log(error)
        return error
    }

}