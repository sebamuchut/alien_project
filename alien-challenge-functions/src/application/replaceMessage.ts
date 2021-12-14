import { Context } from 'koa';
import replaceMessageService from '../../src/service/replaceMessageService';

const replaceMessage = async (ctx: Context) => {
    const body = ctx.request.body;
    const originalMessage = body.original
    const newMessage = body.new

    if (originalMessage && newMessage) {
        const result = await replaceMessageService(originalMessage, newMessage, ctx);
        ctx.body = result
    }
}

export default replaceMessage;