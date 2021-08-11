import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { db } from '../../db';

/*
Author @YH
1. Should only be used by supervisors
2. Pass the unchanged param if only one of the params needed change
3. Although we're not likely to use this function, but I wrote
it anyway.
Inputs {
    oldName : old name
    newAvatar : a link to new avatar
    newName : update name
}
Output {
    promise that either resolved updating school or rejected for error
}
 */

export const updateSchool = async (data:{
  schoolName: string;
  newAvatar: string;
  newSchoolName: string;
}) => {
  const { schoolName, newAvatar, newSchoolName } = data;
  return new Promise(((resolve, reject) => {
    const schoolCollection = db.collection('School');
    schoolCollection.where('schoolName', '==', schoolName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase.storage().refFromURL(doc.get('avatar')).delete()
            .then()
            .catch((error) => {
              reject(new Error(`Update abort: fail to delete old avatar for ${schoolName}, error: ${error}`));
            });
          doc.ref.update({
            schoolName: newSchoolName,
            avatar: newAvatar,
          })
            .then(() => {
              resolve(`Update for ${schoolName} success`);
            })
            .catch((error) => {
              reject(new Error(`Update for ${schoolName} failed, aborted. Error ${error}`));
            });
        });
      }).catch((error) => {
        reject(new Error(`Update for ${schoolName} failed, aborted. Error ${error}`));
      });
  }));
};

export default functions.https.onCall(updateSchool);
