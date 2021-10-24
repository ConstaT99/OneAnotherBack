import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author @Carstin
Search users by userName
Input {
    input: user Name you wanna get
}
Output {
    userData: the array of user data that matched with the input
}
*/
export const searchUser = async (data:{
  input:string;
  preUid: string;
}) => {
  const { input, preUid } = data;
  const collection = 'user';
  const userRef = db.collection(collection);
  let userGet;
  if (preUid === '') {
    userGet = await userRef.where('userName', '>=', input).where('userName', '<=', `${input}\uf8ff`)
      .limit(10).get();
    const userData = userGet.docs.map((doc) => doc.data());
    return userData;
  }
  const preUserRef = db.collection(collection).doc(preUid);
  const preUserDoc = await preUserRef.get();
  const preUserData = preUserDoc.data();
  if (!preUserData) {
    return Promise.reject(new Error('userData could not be reached'));
  }
  userGet = await userRef.where('userName', '>=', input).where('userName', '<=', `${input}\uf8ff`)
    .startAfter(preUserDoc).limit(10)
    .get();
  const userData = userGet.docs.map((doc) => doc.data());
  return userData;
};

export default functions.https.onCall(searchUser);
