 import * as functions from 'firebase-functions';
import { storage } from '../../db';

export const deleteFile = async (data:{
  fname : string,
}) => {
  const { fname } = data;
  const destFile = await storage.file(fname).delete();
};

export default functions.https.onCall(deleteFile);
