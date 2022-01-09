import * as functions from 'firebase-functions';
import fs from 'fs';

import { uploadFile } from '../../func/common/uploadFileFunc';
import { getFileUrl } from '../../func/common/getFileUrlFunc';
import { addSchool } from '../../func/school/addSchoolFunc';

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
  console.log(url);
  await addSchool({
      avatar: url,
      schoolName: data.schoolName,
  })
};

export default functions.https.onCall(uploadSchool);