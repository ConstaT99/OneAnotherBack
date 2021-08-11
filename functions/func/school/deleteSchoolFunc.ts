import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { db } from '../../db';

/*
Author @YH jian
should only be used by supervisors, i.e. from management panel
hopefully we never use this, but I wrote it anyway
Inputs {
    avatar : a link to school avatar
    name : name of school
}
Output {
    promise that either resolved deleting school or rejected for error
}
 */

export const deleteSchool = async (data:{
  name: string;
}) => {
  const { name } = data;
  return new Promise(((resolve, reject) => {
    const schoolCollection = db.collection('School');
    schoolCollection.where('schoolName', '==', name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase.storage().refFromURL(doc.get('avatar')).delete()
            .then()
            .catch((error) => {
              reject(new Error(`Update abort: fail to delete old avatar for ${name}, error: ${error}`));
            });
          doc.ref.delete()
            .then(() => {
              resolve(`Deleted ${name} successfully`);
            })
            .catch((error) => {
              reject(new Error(`Delete for ${name} failed, aborted. Error ${error}`));
            });
        });
      }).catch((error) => {
        reject(new Error(`Delete for ${name} failed, aborted. Error ${error}`));
      });
  }));
};

export default functions.https.onCall(deleteSchool);
