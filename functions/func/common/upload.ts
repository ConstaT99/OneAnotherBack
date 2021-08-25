import * as functions from 'firebase-functions';
import { storage } from '../../db';

/*
Author: JYH
Pass in uid, filename and file read as buffer
! TODO: check MD5 to prevent duplicate files.
! TODO: write more tests
input: {
 uid: owner of this image
 fname: name of the file, this is critical due to auto dtype detection
 file: A byte Buffer of file content
}
output: either the destination filename or error
 */
export const upload = async (data:{
  uid : string,
  fname : string,
  file : Buffer
}) => {
  const { uid, fname, file } = data;
  const destName = `${uid}/${fname}`;
  const destFile = await storage.file(destName);
  const exists = await destFile.exists();
  if (exists[0]) {
    return destName;
  }
  return destFile.save(file) // This will auto inference content type
    .then(() => destName)
    .catch((err) => err);
};

export default functions.https.onCall(upload);
