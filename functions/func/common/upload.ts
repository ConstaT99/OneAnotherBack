import * as functions from 'firebase-functions';
import { storage } from '../../db';
// import firebase from 'firebase';

/*
A scratch function that upload file to cloud storage
input :{
  postfix: string,
  ftype: string,
  file: any,
  fileName: string,
}
written by trn
TODO:
1. finished the uplaod function
*/

export const upload = async (input :{
  // postfix: string,
  ftype: string,
  file: any, // by using File and Blob API
  fileName: string,
}) => {
  const { ftype, file , fileName } = input;
  const storageRef = storage().ref();
  if (ftype === 'image') {
    functions.logger.info('here is image uploader');
    const imagesRef = storageRef.child('image');
    spaceRef = imagesRef.child(fileName);
    
  } else if (ftype === 'video') {
    const videosRef = storageRef.child('video');
    functions.logger.info('here is video uploader');
  } else {
    functions.logger.info('here is wrong ftype given');
  }
  const url = null;
  // this is root reference

  return url;
};

export default functions.https.onCall(upload);
