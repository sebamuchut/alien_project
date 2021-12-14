import { Context } from 'koa';
import messageFromLeader from '../../src/service/getMessageFromLeaderService';

const getMessagesFromLeader = async (ctx: Context) => {
    const leaderName: string = ctx.params.leader
    if (leaderName.length > 1) {
        ctx.body = {msg: 'Leader name consists of only 1 letter'}
    } else {
        const result = await messageFromLeader(leaderName, ctx);
        ctx.body = result
    }
}

export default getMessagesFromLeader;