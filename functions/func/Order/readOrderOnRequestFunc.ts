import * as functions from 'firebase-functions';
import { readOrder } from '../Order/readOrderFunc';

/*
Author: Carstin
On request function for read Order function
Input {
    orderId : The order Id of the requested order
}
Output {
    orderData : the data of teh data requested
}
*/


export const readOrderOnRequest = functions.https.onRequest(async (request, response) =>{
    const orderId = request.query.orderId as string;
    const orderData = await readOrder({orderId});
    response.send(orderData);
})