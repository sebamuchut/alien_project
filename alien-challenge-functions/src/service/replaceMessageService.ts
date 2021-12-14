import { Context } from 'koa';
import { getRepository } from 'typeorm';
import MessageRepo from '../domain/Message';
import moment from 'moment';
import storeMessageService from '../service/storeMessageService';

const replaceMessageService = async (originalMessage: string, newMessage: string, ctx: Context) => {
        const originalInRepo = await getRepository(MessageRepo).findOneOrFail({
            where: {
                text: originalMessage
            }
        })

        let difference = undefined
        if (originalInRepo) {
            const nowMoment = moment()
            const then = moment(originalInRepo.createdAt)
            difference = (nowMoment.diff(then, 'minutes')) + 180
        }

        if (difference < 5) {
            const result = await storeMessageService(newMessage, ctx, originalInRepo.id)
            return result
          
        } else if (difference > 4) {
            const result = {status: 'failed', msg: `Original message must be less than 5 minutes old. The message is ${difference} minutes old`, }
            return result
        }

}

export default replaceMessageService;