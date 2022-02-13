import * as functions from 'firebase-functions';
import { readMultipleRandomBuy } from "../productBuy/readMultipleRandomBuy";

/*
Author: Carstin
The onRequest function for readMultipleRandomBuy
Input {
    prebuyId: the productId of the previous product
}
Out {
    probuyOutput: limit 20 products max for each call
}
*/

export const readMultipleRandomBuyOnRequest = functions.https.onRequest(async (request, response) => {
    const prebuyId = request.query.prebuyId as string;
    const probuyOutput = await readMultipleRandomBuy({prebuyId});
    response.send(probuyOutput);
});