import * as functions from 'firebase-functions';
import { getFileUrl } from './getFileUrlFunc';
import { uploadFile } from './uploadFileFunc';

/*
Author @Cratsin
upload multiple files in one func
Input {
    uid: owner of this image
    fname: an array of name of the file, the value in this array should be corresponding to the file
    file: An array of byte Buffer of file content
}
Output {
    urls: the corresponded url of the file
}
*/

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