import * as functions from 'firebase-functions';
import fs from 'fs';

import { uploadFile } from '../../func/common/uploadFileFunc';
import { getFileUrl } from '../../func/common/getFileUrlFunc';
import { addSchool } from '../../func/school/addSchoolFunc';

/*
Author @Cath
A one-time function used to add all schools' names and avatars into the database.
Input: {
  uid: the uid of the corresponding avatar
  fname: the file name of the avatar
  fileLocation: the directory of the avatar
  schoolName: the corresponding school name of the avatar
}
Output: {
  Successfully added the avatars.
}
*/

export const uploadSchool = async (data:{
  uid : string,
  fname : string,
  fileLocation : string,
  schoolName: string,
}) => {
  const fileRef = await uploadFile({
    uid: data.uid,
    fname: data.fname,
    file: fs.readFileSync(data.fileLocation),
  });
  const url = await getFileUrl({ file: fileRef });
  await addSchool({
      avatar: url,
      schoolName: data.schoolName,
  })
};

export default functions.https.onCall(uploadSchool);
