import * as functions from 'firebase-functions';
import { db } from '../../db';
import { getAvatarByName } from './getAvatarByName';

/*
Author @YH jian
should only be used by supervisors, i.e. from management panel
! TODO: fix ugly code practices
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
// eslint-disable-next-line no-async-promise-executor
}) => new Promise((async (resolve, reject) => {
  const { avatar, schoolName } = data;
  // 5 is just an arbitrary number, should be ok tho
  if (avatar === undefined || schoolName === undefined || avatar.length <= 5 || schoolName.length <= 5) {
    reject(new Error('invalid field'));
    return;
  }
  try {
    const link = await getAvatarByName({ name: schoolName });
    console.log(link);
    reject(new Error('school already exists'));
  } catch {
    db.collection('school').add(data)
      .then((docRef) => {
        resolve(`Upload success for school ${data.schoolName} with ID ${docRef.id}`);
      })
      .catch((error) => {
        reject(error);
      });
  }
}));

export default functions.https.onCall(addSchool);
