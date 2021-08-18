 import * as functions from 'firebase-functions';
import { storage } from '../../db';

export const deleteFile = async (data:{
  uid : string,
  fname : string,
}) => {
  const { uid, fname } = data;
  //const destFile = await storage.file(fname).delete();
  await storage.deleteFiles({prefix : `${uid}/${fname}`}).then().catch((err) => err);
};

export default functions.https.onCall(deleteFile);
