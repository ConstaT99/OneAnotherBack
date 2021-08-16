import * as functions from 'firebase-functions';
import { storage } from '../../db';

export const upload = async (data:{
  uid : string,
  fname : string,
  file : Buffer
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uid, fname, file } = data;
  console.log(uid + fname);
  const destFile = await storage.file('fuk/aaabbb');
  await destFile.save(file, { contentType: 'image/png' }, (err) => {
    if (!err) {
      console.log('uploaded');
      return '0';
    }
    console.log(`something wrong${err}`);
    return '1';
  });
};

export default functions.https.onCall(upload);
