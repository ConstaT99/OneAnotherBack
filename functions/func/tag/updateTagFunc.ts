import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
Test needed, required tagId
!TODO : add more test to this func
input {
    tagId: tagId of a specific tag
    lastUpdate: a unix timestamp which represent the lastest time of modification on this tag
    docId: the docId of this new added post
}
output{
    the lastUpdate time has been changed to the latest version
    the docId of the new added post should be added in DocId array in this tag's collection
}
*/

export const updateTagFunc = async (data:{
    tagId: string,
    lastUpdate: number,
    docId: string
}) => {
    const { tagId, lastUpdate, docId } = data;
    if (tagId == null) {
        return Promise.reject(new Error('tag does not exist'));
    }
    const collection = 'tag';
    const tagRef = db.collection(collection).doc(tagId);

    await tagRef.update({['lastUpdate']: lastUpdate});

    const tagDoc = await tagRef.get();
    const tagData =  tagDoc.data();

    return new Promise((resolve, reject) => {
        if (!tagData) {
            reject(new Error(`tagData Read failed`));
        } else {
            const docIdArray = 'DocId' ? tagData['DocId'] : tagData;
            const newDocId = docIdArray.push(docId);
            tagRef.update({['DocId']: docIdArray});
            resolve(newDocId);
        }
    });

};
export default functions.https.onCall(updateTagFunc);