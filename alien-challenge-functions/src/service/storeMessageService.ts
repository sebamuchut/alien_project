import { Context } from 'koa';
import { getRepository } from 'typeorm';
import MessageRepo from '../domain/Message';
import TypeRepo from '../domain/Types'
import { saveMessage } from '../../src/repository/saveMessage';
import { saveFalseMessage } from '../../src/repository/saveFalseMessage';

const storeMessageService = async (arrivingMessage: string, ctx: Context, id?: string): Promise<void> => {
    const falseMessage = {text: null, reason: null};
    const rawMessage = arrivingMessage.toLowerCase()
    const rawMessageArray = rawMessage.trim().split(' ');
    let firstLetter = rawMessage.charAt(0)
    let typeArray = [];
    let type = '';

    rawMessageArray.forEach(e => {
        // first letter of words are the same?
        if (e.charAt(0) !== firstLetter) return falseMessage.reason = 'first letter';
        // checking if words have 3 consonants
        let consonants = e.split('').splice(1, e.length).join('').match(/[^aeiou]/gi) 
        // consonants number
        if (consonants.length !== 3) return falseMessage.reason = 'number of consonants';
        // consonants order
        let consonantsString = consonants.join('')
        let consonantsStringASC = consonants.sort().join('')
        let consonantsStringDESC = consonants.sort().reverse().join('')
        if (consonantsString === consonantsStringASC) {
            typeArray.push('DANGER');
        } else if (consonantsString === consonantsStringDESC) {
            typeArray.push('WARNING');
        } else {
            typeArray.push('INFO');
        }
    });

    // checking if every word represents the same category
    if (falseMessage.reason === null && 
        typeArray.length > 0 && 
        typeArray.every((val, i, arr) => val === arr[0])) {
        type = typeArray[0]
    } else if (falseMessage.reason === null) {
        falseMessage.reason = 'undefined type'
    }

    // caliing services for FALSE MESSAGE
    if (falseMessage.reason !== null) {
        falseMessage.text = arrivingMessage
        const result = await saveFalseMessage(falseMessage, ctx)
        return result
     
    } else {
        try {
            let messageType = await getRepository(TypeRepo).findOne({where: {value: type}})
            if (!messageType) {
                messageType = new TypeRepo()
                messageType.value = type
            }
            const message = new MessageRepo();
            message.text = arrivingMessage;
            message.leader = 'Alien Leader ' + rawMessage[0].toUpperCase();
            message.type = messageType
            if (id) message.id = id

            // calling services for VALID MESSAGE
            if (id){
                const result = await saveMessage(message, ctx, id)
                return result                
            } else {
                const result = saveMessage(message, ctx)
                return result
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export default storeMessageService;