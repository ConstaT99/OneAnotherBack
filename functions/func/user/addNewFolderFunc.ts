import * as functions from 'firebase-functions';
import { db } from '../../db';

export const addNewFolder = async (data:{
    uid:string,
    newAddedName:string,
}) => {
    const {uid, newAddedName} = data;

    const userRef = db.collection('user').doc(uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    if (!userData) {
        return Promise.reject(new Error('userData could not be fetched'));
    }
    var saveArray = userData.savedPost;
    for (var item of saveArray) {
        if (item == newAddedName) {
            return Promise.resolve('folder already existed');
        }
    }
    await saveArray.push(newAddedName);
    await userRef.update({savedPost: saveArray});

    const folderName:string = newAddedName;
    const savedPosts:string[] = [];
    const newFolder = {
        folderName,
        savedPosts,
    }
    const saveRef = userRef.collection('savedPosts');
    await saveRef.add(newFolder);
    return Promise.resolve('new folder been sucessfully added to user profile');
}
export default functions.https.onCall(addNewFolder);