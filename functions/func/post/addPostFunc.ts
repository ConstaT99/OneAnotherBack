import * as functions from 'firebase-functions';
import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';
import { updateCat } from '../categories/updateCatFunc';
import { addTag } from '../tag/addTagFunc';

/*
TODO:
1. limit the title character number
2. limit the content character number
*/
export const addPost = async (data: {
  uid: string;
  title: string | null; // 30 字
  content: string | null; // contain text of the post 1000 字
  image: string[];// contain image url
  tag: string; // tagid
  categories: string | null; // categroy id
  aStatus: boolean;
}) => {
  const {
    uid, content, title, image, tag, aStatus,
  } = data;
  let { categories } = data;
  if (uid == null) {
    return Promise.reject(new Error('user is not exist'));
  }
  if (!isUserExists({ uid })) {
    return Promise.reject(new Error('user is not exists'));
  }
  if (image.length > 4) {
    return Promise.reject(new Error('exceed the number of images'));
  }
  if (title == null && content == null) {
    return Promise.reject(new Error('one of title should not null'));
  }
  if (categories == null) {
    categories = '其它';
  }
  const createTime:number = Math.floor(Date.now() / 1000);
  const editTime:number = Math.floor(Date.now() / 1000);
  const like:number = 0;
  const comment:Array<string> = [];
  const commentNum:number = 0;
  const likeBy:Array<string> = [];
  const savedBy:Array<string> = [];
  const shareBy:Array<string> = [];
  const viewNum : number = 0;
  const edited:boolean = false;
  const postScore:number = 0;

  const postData = {
    uid,
    title,
    content, // can be null
    image,
    tag,
    categories,
    createTime,
    editTime,
    like,
    likeBy,
    comment,
    savedBy,
    shareBy,
    viewNum,
    commentNum,
    edited,
    aStatus,
    postScore,
  };
  const collection = 'post';
  const postRef = db.collection(collection);
  const result = await postRef.add(postData);
  const taginfo = {
    name: tag,
    postId: result.id,
  };
  await addTag(taginfo);
  const catRefid = db.collection('categories');
  const snapshot = await catRefid.where('catName', '==', categories).get();
  const catId = snapshot.docs[0].id;

  await updateCat({ catId, postId: result.id });
  return result;
};

export default functions.https.onCall(addPost);
