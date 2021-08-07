import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { db } from '../../db';

// Delete video via a url
export const deleteVideo = async (data:{
  url: string;
}) => {
  // Get a storage instance
  const { url } = data;
  const storage = firebase.storage();
  const fileRef = storage.refFromURL(url);
  return new Promise((resolve, reject) => {
    fileRef.delete().then(() => {
      const videoCollection = db.collection('video');
      videoCollection.where('url', '==', url)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
              functions.logger.log(`Deleted ${doc} of url ${url} from video`);
            }).catch((error) => {
              reject(new Error(`Did not delete references of ${url}. Error: ${error}`));
            });
          });
        })
        .catch((error) => {
          reject(new Error(`Did not file document of ${url}. Error: ${error}`));
        });
    }).catch((error) => {
      // Did not delete successfully
      reject(new Error(`Deleted file failed: ${error}`));
    });
    resolve('Delete success');
  });
};

export default functions.https.onCall(deleteVideo);
