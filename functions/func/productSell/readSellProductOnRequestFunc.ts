import * as functions from 'firebase-functions';
import { readProdSell } from './readSellProductFunc';

/*
Author: Carstin
This is a on request function for readProdSell function
Input {
    prodId : the Id of the product requested
}
Output {
    the product data
}
*/

export const readProdSellOnRequest = functions.https.onRequest(async (request, response) => {
    const prodId = request.query.prePostId as string;
    const prodData = await readProdSell({prodId});
    response.send(prodData);
});