import moment from "moment";
import axios from 'axios';
import { getRepository } from "typeorm";
import ValidMessageRepo from '../domain/Message';

const getDangerMessagesByLeader = async (leader: string) => {
    try {
        const dangerMessages = await getRepository(ValidMessageRepo)
        .find({
            where: [
                {
                    leader: leader
                },
                {
                    type: {
                        value: "DANGER"
                    }
                }
            ],
            order: {
                createdAt: "DESC"
            }
        })
        if (dangerMessages.length > 4){
            const fifthTime = moment(dangerMessages[4].createdAt)
            const nowMoment = moment()
            const difference = (nowMoment.diff(fifthTime, 'minutes')) + 180

            if (difference < 61) {
                await axios.post(process.env.SLACK_WEBHOOK, {
                    text: `${leader} has sent five DANGER messages within the last hour!`
                });
                console.log(`${leader} has sent five DANGER messages within the last hour!`)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default getDangerMessagesByLeader;