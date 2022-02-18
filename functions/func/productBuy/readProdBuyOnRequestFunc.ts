import * as functions from 'firebase-functions';
import { readProdBuy } from '../productBuy/readProdBuyFunc';

/*
Author : Carstin
This is the On request function
Input {
    prodId: the product Id of the product requested 
}
Output {
    prodData: the Data of the product requested
}
*/
export const readProdBuyOnRequest = functions.https.onRequest(async (request, response) => { 
    const prodId = request.query.prodId as string;
    const prodData = await readProdBuy({prodId});
    response.send(prodData);
});