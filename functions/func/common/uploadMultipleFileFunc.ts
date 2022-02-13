/* eslint-disable */ 
import * as functions from 'firebase-functions';
import { getFileUrl } from './getFileUrlFunc';
import { uploadFile } from './uploadFileFunc';

/*
Author @Cratsin
upload multiple files in one func
Input {
    uid: owner of this image
    fname: an array of name of the file, the value in this array should be corresponding to the file
    file: An array of byte Buffer of file content
}
Output {
    urls: the corresponded url of the file
}
*/

export const uploadMultipleFile = async (data:{
  uid : string,
  fname : string[],
  file : Buffer[]
}) => {
  const { uid, fname, file } = data;
  if (uid === null) {
    return Promise.reject(new Error('uid is empty'));
  }
  if (file.length === 0 || fname.length === 0) {
    return Promise.reject(new Error('file array or fileName array is empty'));
  }
  const urlArray = [];
  for (let i = 0; i < file.length; i += 1) {
    const tmpFname = fname[i];
    const tmpFile = file[i];
    const tmpDestName = await uploadFile({ uid, fname: tmpFname, file: tmpFile });
    const url = await getFileUrl({ file: tmpDestName });
    urlArray.push(url);
  }
  if (urlArray === undefined) {
    return Promise.reject(new Error('urlArray is Empty'));
  }
  return urlArray;
};
export default functions.https.onCall(uploadMultipleFile);
