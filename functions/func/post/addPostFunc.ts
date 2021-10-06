import * as functions from 'firebase-functions';
import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';
import { updateCat } from '../categories/updateCatFunc';
import { addTag } from '../tag/addTagFunc';
import { getAvatarByName } from '../school/getAvatarByNameFunc';

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
  tag: string; // tagName
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
    categories = 'HaYEZRkuTrcveAOMo7PE';
  }
  const createTime:number = Math.floor(Date.now() / 1000);
  const editTime:number = Math.floor(Date.now() / 1000);
  const likeNum:number = 0;
  const shareNum:number = 0;
  const savedNum: number = 0;
  const comment:Array<string> = [];
  const commentNum:number = 0;
  const likeBy:Array<string> = [];
  const savedBy:Array<string> = [];
  const shareBy:Array<string> = [];
  const viewNum : number = 0;
  const edited:boolean = false;
  const postScore:number = 16.5;
  const privacy:boolean = false; // 是否被设为私密动态
  const userRef = db.collection('user').doc(uid);
  const tagDoc = await userRef.get();
  const userData = tagDoc.data();
  if (!userData) {
    return Promise.reject(new Error('user does not exist'));
  }
  const userAvatar:string = userData.avatar;
  const { userName } = userData;
  let userSchool:string = '';
  let schoolAvatar:string = '';
  if (userData.school !== '') {
    userSchool = userData.school;
    schoolAvatar = await getAvatarByName({ name: userSchool });
  }

  const postData = {
    userSchool,
    schoolAvatar,
    userAvatar,
    userName,
    uid,
    title,
    content, // can be null
    image,
    tag,
    categories,
    createTime,
    editTime,
    likeNum,
    likeBy,
    comment,
    savedBy,
    shareBy,
    viewNum,
    commentNum,
    edited,
    aStatus,
    shareNum,
    savedNum,
    postScore,
    privacy,
    postId: '',
  };
  const collection = 'post';
  const postRef = db.collection(collection);
  const result = await postRef.add(postData);
  postRef.doc(result.id).update({ postId: result.id });
  const taginfo = {
    name: tag,
    postId: result.id,
  };

  await addTag(taginfo);

  await updateCat({ catId: categories, postId: result.id });
  return result;
};

export default functions.https.onCall(addPost);