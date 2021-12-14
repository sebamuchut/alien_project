import { Context } from 'koa';
import getMessagesService from '../../src/service/getMessagesService';


const getMessages = async (ctx: Context) => {
    const status: string = ctx.params.status
    if (status !== 'valid' && status !== 'invalid') {
        ctx.body = {msg: 'request parameter must be either VALID or INVALID' }
    } else {
        const result = await getMessagesService(status, ctx)
        ctx.body = result
    }
}

export default getMessages;