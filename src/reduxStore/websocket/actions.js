import io from 'socket.io-client';
import * as messageTypes from './messageTypes';
import { WEBSOCKET_URL } from '../../config';

const socket = io(WEBSOCKET_URL);

export const init = (store) => {

    socket.on(messageTypes.RECEIVE_USER_ORDER_REQUEST_CONFIRM, payload => {
        // store.dispatch()
    })


}