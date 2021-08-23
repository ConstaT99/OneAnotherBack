import * as functions from 'firebase-functions';
import {isTagExists} from './isTagExists';
import {getPicOfPost} from '../post/getPicOfPost';
//import firebase from 'firebase';
import { db } from '../../db'
import { updateTagFunc } from './updateTagFunc';


/*
Author @Carstin
This function must be called AFTER the createPost function since it requires the docId of the first post as an input
! TODO: get the time for the tag (unix timestamp)
Input {
    name: name of the tag
    postId: the docId of the post first created under this tag
}
Output {
    the tag should be added into the tag collection
}

*/

export const addTagFunc = async (data:{
    name: string
    postId: string
}) => {
    const {name, postId} = data;
    if (name === null) {
        //reject(new Error('invalid field'));
        return Promise.reject(new Error('invalid field'));
    }
    const checkExists = await isTagExists({name: name});
    if (checkExists != null) {
       await updateTagFunc({tagId: checkExists, postId: postId});
       return checkExists; // link the post to the existing tag
    }
    const posts:Array<string> = [postId];// put the first post in to the DocId array
    var avatar:string = 'https://firebasestorage.googleapis.com/v0/b/oneanother-757c7.appspot.com/o/defaultTagAvatar.png?alt=media&token=80fb2991-96de-4c89-bf88-f6566315da57';
    const access:boolean = true; // accessbility of this tag
    const lastUpdate : number = Math.floor(Date.now() / 1000);
    const postPic = await getPicOfPost({postId: postId});
    if (postPic != null && typeof postPic === "string") {
        avatar = postPic;
    }

    const tagInfo = {
        access,
        posts,
        avatar,
        name,
        lastUpdate,
        tagId: ''
    };
    const collection = 'tag';
    const tagRef = db.collection(collection);
    const docRef = await tagRef.add(tagInfo);
    tagRef.doc(docRef.id).update({'tagId' : docRef.id});
    return docRef.id;
};


export default functions.https.onCall(addTagFunc);