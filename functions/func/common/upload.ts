import * as functions from 'firebase-functions';
import { storage } from '../../db';

export const upload = async (input :{
  postfix: string,
  ftype: string,
  filePath: string,
  fname: string,
}) => {
  const { postfix, ftype, filePath } = input;
  const storageRef = storage.ref();
  if (ftype === 'image') {
    functions.logger.info('here is image uploader');
    const fileName = 'image/';
    const imagesRef = storageRef.child('');
  } else if (ftype === 'video') {
    const fileName = 'video/';
    functions.logger.info('here is video uploader');
  } else {
    functions.logger.info('here is wrong ftype given');
  }
  const url = null;
  // this is root reference

  return url;
};

export default functions.https.onCall(upload);
