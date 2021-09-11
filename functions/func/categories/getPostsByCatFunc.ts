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
export const getPostsByCat = async (data:{
  prePostId: string,
  catId: string,
}) => {
  const collection = 'categories';
  const { catId, prePostId } = data;
  const catRef = db.collection(collection).doc(catId);
  const catDoc = await catRef.get();
  const catData = catDoc.data();
  if (!catData) {
    return Promise.reject(new Error('cat does not exist'));
  }
  if (catData.postArray.length === 0) {
    const outArray:string[] = [];
    return outArray;
  }
  // const outArray:string[] =  catData.postArray;

  if (prePostId == "") {
    const postRef = db.collection('post');
    const postGet = await postRef.where('categories', '==', catId).orderBy("postScore", "desc").limit(10).get();
    const postsData = postGet.docs.map((doc) => doc.data());
    return postsData;

} else {
    const postRef = db.collection('post');
    const postGet = await postRef.where('categories', '==', catId).orderBy("postScore", "desc").startAfter(prePostId).limit(10).get();
    const postsData = postGet.docs.map((doc) => doc.data());
    return postsData;
}


  
};
export default functions.https.onCall(getPostsByCat);
