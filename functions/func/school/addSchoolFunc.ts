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
  schoolName: string;
}) => new Promise(((resolve, reject) => {
  const { avatar, schoolName } = data;
  // 5 is just an arbitrary number, should be ok tho
  if (avatar === undefined || schoolName === undefined || avatar.length <= 5 || schoolName.length <= 5) {
    reject(new Error('invalid field'));
    return;
  }
  // getAvatarByName({ name: schoolName })
  //   .then(() => {
  //     reject(new Error(`school ${schoolName} already exists`));
  //   })
  //   .catch(() => {});

  //! TODO: check unique name
  db.collection('school').add(data)
    .then((docRef) => {
      resolve(`Upload success for school ${data.schoolName} with ID ${docRef.id}`);
    })
    .catch((error) => {
      reject(error);
    });
}));

export default functions.https.onCall(addSchool);
