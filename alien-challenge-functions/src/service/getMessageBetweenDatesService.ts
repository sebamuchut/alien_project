import { Context } from 'koa';
import { getRepository } from 'typeorm';
import Message from '../domain/Message';
import { Between } from 'typeorm';

const betweenDatesService = async (ctx: Context) => {
    try {
      const date1 = new Date(ctx.params.date1)
      const date2 = new Date(ctx.params.date2)
      ctx.body = await getRepository(Message).find({
          where: {
              createdAt: Between(date1, date2)
          }
      })
      return ctx.body
    } catch (error) {
      console.log(error)
      return error
    }
}

export default betweenDatesService;
