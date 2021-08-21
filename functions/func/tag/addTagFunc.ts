import * as functions from 'firebase-functions';
import {isTagExists} from './isTagExists'
import { db } from '../../db'

/*
Author @Carstin
This function must be called AFTER the createPost function since it requires the docId of the first post as an input
! TODO: change the default avatar to the first pic of the first post if there is any

*/

export const addTagFunc = async (data:{
    name: string
    docId: string
}) => {
    const {name, docId} = data;
    if (name === null) {
        //reject(new Error('invalid field'));
        return Promise.reject(new Error('invalid field'));
    }
    //const checkExists = await isTagExists({name: name});
    if (isTagExists({name: name})) {
        return; // link the post to the existing tag
    }
    const DocId:string[] = [docId];// put the first post in to the DocId array
    const avatar:string = 'https://firebasestorage.googleapis.com/v0/b/oneanother-757c7.appspot.com/o/defaultTagAvatar.png?alt=media&token=80fb2991-96de-4c89-bf88-f6566315da57';

    const tagInfo = {
        DocId,
        avatar,
        name,
    };
    const collection = 'tag';
    const tagRef = db.collection(collection);
    return new Promise< string | Error >((resolve, reject) => {
        tagRef.add(tagInfo).then(() => {
            resolve(`new tag ${name} is created successfully.`);
        }).catch((error)=>{
            reject(error);
        });
    });
};


export default functions.https.onCall(addTagFunc);