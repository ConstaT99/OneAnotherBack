import * as functions from 'firebase-functions';
import {isTagExists} from './isTagExists';
import {getPicOfPost} from '../post/getPicOfPost';
import { db } from '../../db'


/*
Author @Carstin
This function must be called AFTER the createPost function since it requires the docId of the first post as an input
! TODO: get the time for the tag (unix timestamp)
Input {
    name: name of the tag
    docId: the docId of the post first created under this tag
}
Output {
    the tag should be added into the tag collection
}

*/

export const addTagFunc = async (data:{
    lastUpdate : number
    name: string
    postId: string
}) => {
    const {name, postId, lastUpdate} = data;
    if (name === null) {
        //reject(new Error('invalid field'));
        return Promise.reject(new Error('invalid field'));
    }
    const checkExists = await isTagExists({name: name});
    if (checkExists) {
        return Promise.reject(new Error('tag is exists')); // link the post to the existing tag
    }
    const DocId:string[] = [postId];// put the first post in to the DocId array
    var avatar:string = 'https://firebasestorage.googleapis.com/v0/b/oneanother-757c7.appspot.com/o/defaultTagAvatar.png?alt=media&token=80fb2991-96de-4c89-bf88-f6566315da57';
    const access:boolean = true; // accessbility of this tag
    
    const postPic = await getPicOfPost({docId: postId});
    if (postPic != null && typeof postPic === "string") {
        avatar = postPic;
    }

    const tagInfo = {
        access,
        DocId,
        avatar,
        name,
        lastUpdate
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