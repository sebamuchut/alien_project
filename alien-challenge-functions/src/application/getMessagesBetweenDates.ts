import { Context } from 'koa';
import betweenDatesService from '../../src/service/getMessageBetweenDatesService';

const getMessagesBetweenDates = async (ctx: Context) => {
    if(ctx.params.date1.length<4 || ctx.params.date2.length<4){
        ctx.body = {status: 'failed', msg: 'missing date parameters YYYY/MM/DD'}
    } else {
      const result = await betweenDatesService(ctx)
      ctx.body = result
    }
}

export default getMessagesBetweenDates;