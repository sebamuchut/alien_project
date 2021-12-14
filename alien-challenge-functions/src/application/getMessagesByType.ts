import { Context } from 'koa';
import byTypeService from '../../src/service/getMessagesByTypeService';


const getMessagesByType = async (ctx: Context) => {
    const typeSent = ctx.params.type.toUpperCase()
    if(typeSent === 'DANGER' || typeSent === 'INFO' || typeSent === 'WARNING') {
        const result = await byTypeService(typeSent, ctx)
        ctx.body = result
    } else {
        ctx.body = {status: 'failed', msg: 'sent status must be either DANGER, INFO, or WARNING'}
    }

   
}

export default getMessagesByType;