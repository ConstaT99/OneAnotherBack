import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
This function is for get score for the product Written By Jerry.
Input {
  postId: the productSellId of the product you want to get score of
}
Output {
  return the actual score of the product (does not include upload)
}
*/

export const getSellProdScore = async(data:{
    prodId: string
}) =>{
    const { prodId } = data;
    const collection = "productSell";
    const productSellRef = db.collection(collection).doc(prodId);
    const productSellDoc = await productSellRef.get();
    const productSellData = productSellDoc.data();

    if(!productSellData){
        return Promise.reject(new Error(`sell product read failed, with product id [${prodId}].`))
    }
    // todo： need to have add and delete cart.
    return 0; 
}