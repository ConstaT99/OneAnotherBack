import * as functions from 'firebase-functions';
import { storage } from '../../db';
/*
@Author Carstin
delete the file in the storage
Input {
  uid: the folder name in the storage (uid of the user)
  fname: the file name of the file you wanna delete
}
Output {
  successfully deleted
}

*/

export const deleteFileFunc = async (data:{
  uid : string,
  fname : string,
}) => {
  const { uid, fname } = data;
  await storage.deleteFiles({ prefix: `${uid}/${fname}` }).then().catch((err) => err);
};

export default functions.https.onCall(deleteFileFunc);
