import * as functions from 'firebase-functions';
import firebase from 'firebase';
// import { db, storage } from '../../db';

/*
A scratch function that adds video to cloud storage
Inputs: {
    userId: id of user who uploads video
    fname: filename of the video
    content: the video
}
Written by jyh
!TODO:
  1. test it, my test suite isn't working (probably because of GFW)
  2. Figure out how to pass content
  3. Add metadata
  4. Figure out return type
 */

export const addVideo = async (data:{
  userId: string,
  fname: string,
  content: any;
}) => {
  // Deconstruct data
  const { userId, fname, content } = data;

  // Create a file reference in firebase storage
  const storageRef = firebase.storage().ref();
  // `video/${fname}`
  const fileRef = storageRef.child(fname);
  // Upload file
  const uploadTask = fileRef.put(content);
  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    functions.logger.log(`Upload is ${progress}% done`);
    // eslint-disable-next-line default-case
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        functions.logger.log('Upload is paused ');
        break;
      case firebase.storage.TaskState.RUNNING:
        functions.logger.log('Upload is running ');
        break;
    }
  },
  (error) => error,
  () => {
    const date = new Date();
    const url = uploadTask.snapshot.ref.getDownloadURL();
    functions.logger.log(`Uploaded file ${fname} for user ${userId} at ${date.toLocaleTimeString()}`);

    // Get current time
    const document = {
      userId,
      videoUrl: url,
      date,
    };

    // Add document
    const collection = 'video';
    const videoRef = db.collection(collection);
    return videoRef.add(document);
  });
};

export default functions.https.onCall(addVideo);
