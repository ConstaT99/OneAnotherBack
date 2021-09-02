import * as functions from 'firebase-functions';
import { db } from '../../db';
import { getPostScore } from './getPostScoreFunc';
/*
Author: @Carstin
return the score of this post
Input {
  postId: the postId of the post you want to get score of
}
Output {
  return the actual score of the post (does not include upload)
}
*/

export const getTagScore = async (data:{
  tagId: string
}) => {
  const { tagId } = data;
  const tagRef = db.collection('tag').doc(tagId);
  const tagDoc = await tagRef.get();
  const tagData = tagDoc.data();

  if (!tagData) {
    return Promise.reject(new Error(`tagData Read failed: at collection post with tagName [${name}].`));
  }

  let tagScore = 0;
  const posts = tagData.posts;
  console.log("posts vector is: ", posts);

  return new Promise((resolve, reject) => {
      const array = [0];
      posts.forEach(async (postId:string) => {
        let postScore = await getPostScore({postId});
        console.log("this post is:", postId, " and score is: ",postScore);
        tagScore += postScore;
        array.splice(0,1,tagScore);
        console.log("updated score is: ",array[0]);
      });
      resolve(array);
  });

  /*
  await posts.forEach(async (postId : string) => {
    let postScore = await getPostScore({postId});
    console.log("this post is:", postId, " and score is: ",postScore);
    tagScore += postScore;
    postArray.splice(0,1,tagScore);
    console.log("updated score is: ",postArray[0]);
    resolve(postArray);
  });
  
  console.log("so the tagScore is: ", postArray[0]);
  return tagScore;*/
};
export default functions.https.onCall(getTagScore);
