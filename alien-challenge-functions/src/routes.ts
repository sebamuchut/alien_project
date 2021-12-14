
import Router from 'koa-router';
import storeMessageMethod from './application/storeMessage';
import getMessagesFromLeader from './application/getMessagesFromLeader';
import getMessagesByType from './application/getMessagesByType';
import getMessages from './application/getMessages';
import getMessagesBetweenDates from './application/getMessagesBetweenDates';
import replaceMessage from './application/replaceMessage';

const routes = new Router();

routes
    .get('/messages/:status', getMessages)
    .get('/messages/dates/:date1/:date2', getMessagesBetweenDates)
    .get('/messages/leader/:leader', getMessagesFromLeader)
    .get('/messages/types/:type', getMessagesByType)
    .post('/store-message', storeMessageMethod)
    .put('/replace-message', replaceMessage)

export default routes;
