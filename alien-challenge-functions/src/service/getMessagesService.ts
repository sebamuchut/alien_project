import { Context } from 'koa';
import { getRepository } from 'typeorm';
import ValidMessageRepo from '../domain/Message';
import InvalidMessageRepo from '../domain/InvalidMessage';

const getMessagesService = async (status: string, ctx: Context) => {
    try {
         if (status === 'valid') {
             ctx.body = await getRepository(ValidMessageRepo).find()
         } else {
             ctx.body = await getRepository(InvalidMessageRepo).find()
         }
         return ctx.body
     } catch (error) {
         console.log(error)
         return error
     }
}

export default getMessagesService;