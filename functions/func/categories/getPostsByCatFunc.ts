import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author @Carstin
return a postArray which contains all of the postId under this cat
Input {
    name: the name of the cat you wanna find
}
Output {
    return the postArray under this cat
}
*/
export const getPostsByCatFunc = async (data:{
  name: string;
}) => {
  const collection = 'categories';
  const { name } = data;
  const catRef = db.collection(collection);
  const snapshot = await catRef.where('catName', '==', name).get();
  const postsData = snapshot.docs[0].data();
  return postsData.postArray;
};
export default functions.https.onCall(getPostsByCatFunc);
