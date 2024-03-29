import * as functions from 'firebase-functions';
import { storage } from '../../db';
/*
Author @Cratsin
Get the url of the file within 5 min
Input {
    file: the reference of the input file
}
Output {
    urls: the corresponded url of the file
}
*/
export const getFileUrl = async (data:{
  file: string
}) => {
  const { file } = data;
  const storagePath = storage.file(file);
  const expiration = new Date();
  expiration.setDate(expiration.getFullYear() + 99);
  const urls = await storagePath.getSignedUrl({ action: 'read', expires: expiration });
  return urls[0];
};

export default functions.https.onCall(getFileUrl);
