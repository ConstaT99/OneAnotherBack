import * as functions from 'firebase-functions';
import { db } from '../../db';
import { addTagFunc } from '../tag/addTagFunc';

/*
TODO:
1. limit the title character number
2. limit the content character number
*/
export const addPostFunc = async (data: {
  uid: string;
  title: string | null; // 30 字
  content: string | null; // contain text of the post 1000 字
  image: string[] | null[];// contain image url
  tag: string; // tagid
  categories: string | null; // categroy id
}) => {
  const {
    uid, content, title, image, tag,
  } = data;
  let { categories } = data;
  if (uid == null) {
    return Promise.reject(new Error('user is not exist'));
  }
  if (image.length > 4) {
    return Promise.reject(new Error('exceed the number of images'));
  }
  if (title == null && content == null) {
    return Promise.reject(new Error('one of title should not null'));
  }
  if (categories == null) {
    categories = 'other';
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
  };
  const collection = 'post';
  const postRef = db.collection(collection);
  const result = await postRef.add(postData);
  const taginfo = {
    name: tag,
    postId: result.id,
  };
  addTagFunc(taginfo); // add tag
  return result;
};

export default functions.https.onCall(addPostFunc);
