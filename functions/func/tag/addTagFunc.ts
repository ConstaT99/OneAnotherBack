import * as functions from 'firebase-functions';
import { isTagExists } from './isTagExists';
import { getPicOfPost } from '../post/getPicOfPost';
import { db } from '../../db';
import { updateTag } from './updateTagFunc';

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
const DEFAULT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/oneanother-757c7.appspot.com'
  + '/o/defaultTagAvatar.png?alt=media&token=80fb2991-96de-4c89-bf88-f6566315da57';
export const addTag = async (data:{
  name: string
  postId: string
}) => {
  const { name, postId } = data;
  if (name === null) {
    return Promise.reject(new Error('invalid field'));
  }
  const checkExists = await isTagExists({ name });
  if (checkExists != null) {
    await updateTag({ tagId: checkExists, postId });
    return checkExists; // link the post to the existing tag
  }
  const posts:Array<string> = [postId];// put the first post in to the DocId array
  let avatar:string = DEFAULT_AVATAR;
  const access:boolean = true; // accessbility of this tag
  const lastUpdate : number = Math.floor(Date.now() / 1000);
  const postPic = await getPicOfPost({ postId });
  if (postPic != null && typeof postPic === 'string') {
    avatar = postPic;
  }
  const tagScore : number = 16.5;
  const tagInfo = {
    access,
    posts,
    avatar,
    name,
    lastUpdate,
    tagId: '',
    tagScore,
  };
  const collection = 'tag';
  const tagRef = db.collection(collection);
  const docRef = await tagRef.add(tagInfo);
  tagRef.doc(docRef.id).update({ tagId: docRef.id });
  return docRef.id;
};

export default functions.https.onCall(addTag);
