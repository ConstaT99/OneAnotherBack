import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @YH jian
should only be used by supervisors, i.e. from management panel
Inputs {
    avatar : a link to school avatar
    name : name of school
}
Output {
    promise that either resolved adding school or rejected for error
}
 */

export const addSchool = async (data:{
  avatar: string;
  name: string;
}) => new Promise(((resolve, reject) => {
  db.collection('school').add(data)
    .then((docRef) => {
      resolve(`Upload success for school ${data.avatar} with ID ${docRef.id}`);
    })
    .catch((error) => {
      reject(error);
    });
}));

export default functions.https.onCall(addSchool);
