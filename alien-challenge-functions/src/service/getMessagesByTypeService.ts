import { Context } from 'koa';
import { getRepository } from 'typeorm';
import TypesRepo from '../domain/Types';

const byTypeService = async (type: string, ctx: Context) => {
    try {
       ctx.body = await getRepository(TypesRepo).find({
           relations: ["messages"],
           where: {
               value: type
           }
       })
       return ctx.body   
    } catch (error) {
       console.log(error)
       return error
    }
}

export default byTypeService;
