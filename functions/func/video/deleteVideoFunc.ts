import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { db } from '../../db';


// Delete video via a url
export const deleteVideo = async (data:{
    url: string;
  }) => {
    // Get a storage instance
    const {url} = data;
    const storage = firebase.storage();
    const fileRef = storage.refFromURL(url);
    fileRef.delete().then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Did not delete successfully
        return error;
      });
  }

export default functions.https.onCall(deleteVideo);