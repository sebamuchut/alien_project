import { Context } from 'koa';
import { getRepository } from 'typeorm';
import Message from '../domain/Message';

const messageFromLeader = async (leaderName:string, ctx: Context) => {
    try {
        ctx.body = await getRepository(Message).find({
            where: {
                leader: 'Alien Leader ' + leaderName.toUpperCase()
            }
        })
        return ctx.body
    } catch (error) {
        console.log(error)
        return error
    }
}

export default messageFromLeader;