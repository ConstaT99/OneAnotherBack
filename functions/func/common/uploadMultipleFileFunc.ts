import * as functions from 'firebase-functions';
import { uploadFile } from './uploadFileFunc';


export const uploadMultipleFile = async (data:{
    uid : string,
    fname : string[],
    file : Buffer[]
}) => {
    const { uid, fname, file } = data;
    if (file.length === 0) {
        return Promise.reject('file array is empty');
    }
    var destNameArray = [];
    for (let i = 0; i < file.length; i++) {
        var tmpFname = fname[i];
        var tmpFile = file[i];
        var tmpDestName = await uploadFile({uid: uid, fname: tmpFname, file: tmpFile});
        destNameArray.push(tmpDestName);
    }
    return destNameArray;
}
export default functions.https.onCall(uploadMultipleFile);