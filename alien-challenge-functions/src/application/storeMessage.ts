import { Context } from 'koa';
import storeMessageService from '../service/storeMessageService';


const storeMessageMethod = async (ctx: Context) => {
    const rawMessage: string = ctx.request.body;
    try {
        const result = await storeMessageService(rawMessage, ctx)
        ctx.body = result
    } catch (error) {
        console.log(error)
    }
}

export default storeMessageMethod;