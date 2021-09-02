import * as functions from 'firebase-functions';
import { getFileUrl } from './getFileUrlFunc';
import { uploadFile } from './uploadFileFunc';


export const uploadMultipleFile = async (data:{
    uid : string,
    fname : string[],
    file : Buffer[]
}) => {
    const { uid, fname, file } = data;
    if (file.length === 0 || fname.length === 0) {
        return Promise.reject('file array or fileName array is empty');
    }
    var urlArray = [];
    for (let i = 0; i < file.length; i++) {
        var tmpFname = fname[i];
        var tmpFile = file[i];
        var tmpDestName = await uploadFile({uid: uid, fname: tmpFname, file: tmpFile});
        var url = getFileUrl({file: tmpDestName});
        urlArray.push(url);
    }
    return urlArray;
}
export default functions.https.onCall(uploadMultipleFile);