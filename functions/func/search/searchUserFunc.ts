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
  input:string
}) => {
  const { input } = data;
  const collection = 'user';
  const userRef = db.collection(collection);
  const userGet = await userRef.where('userName', '>=', input).where('userName', '<=', `${input}\uf8ff`).get();
  const userData = userGet.docs.map((doc) => doc.data());
  return userData;
};
export default functions.https.onCall(searchUser);
