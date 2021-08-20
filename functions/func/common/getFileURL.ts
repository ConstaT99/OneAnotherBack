import * as functions from 'firebase-functions';
import { storage } from '../../db';

export const getFileURL = async (data:{
    file: string
}) => {
    const {file} = data;
    const storagePath = await storage.file(file);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 5);
    const urls = await storagePath.getSignedUrl({ action: 'read', expires: expiration });
    return urls[0];
}

export default functions.https.onCall(getFileURL);