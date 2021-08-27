import * as functions from 'firebase-functions';
import { db } from '../../db';
import { addTagFunc } from '../tag/addTagFunc';

/*
TODO:
1. limit the title character number
2. limit the content character number
3. add tag if tag is not exist
*/
export const addPostFunc = async (data: {
  uid: string;
  title: string; // 30 字
  content: string; // contain text of the post 1000 字
  image: [string];// contain image url
  tag: string; // tagid
  categories: string; // categroy id
}) => {
  const {
    uid, content, title, image, tag,
  } = data;
  let { categories } = data;
  if (uid == null) {
    return Promise.reject(new Error('user is not exist'));
  }
  if (image.length < 4) {
    return Promise.reject(new Error('exceed the number of images'));
  }
  if (title != null || content != null) {
    if (categories == null) {
      categories = 'other';
    }
    const postData = {
      uid,
      title,
      content, // can be null
      image,
      tag,
      categories,
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
  }
  return Promise.reject(new Error('content or title is not exist'));
};

export default functions.https.onCall(addPostFunc);
