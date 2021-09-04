import * as functions from 'firebase-functions';
import { db } from '../../db';
import { updateRepliedComment } from './updateRepliedCommentFunc';
import { updateRepliedPost } from './updateRepliedPostFunc';

/*
author @Cath
Input {
    author: the userId of user who composed the comment
    content: the content of the comment
    replyToPost: indicates whether the comment is replying to a post/comment
    replyId: the id of the post/comment that this comment is replying to.
}
Output {
    the comment should be added into the comment collection
}

//TO DO: update repliedBy for the parent post/comment
*/

export const addComment = async (data: {
  author: string
  content: string
  replyToPost: boolean
  replyId: string
}) => {
  const {
    author, content, replyToPost, replyId,
  } = data;
  if (content === null) {
    return Promise.reject(new Error('Empty content, invalid field.'));
  }
  const likedBy:Array<string> = []; // list of uids that liked this comment
  const repliedBy:Array<string> = []; // list of comments that replied to this comment
  const timePosted:number = Math.floor(Date.now() / 1000);
  const commentInfo = {
    author,
    content,
    likedBy,
    repliedBy,
    replyId,
    replyToPost,
    timePosted,
  };
  const collection = 'comment';
  const commentRef = db.collection(collection);
  const docRef = await commentRef.add(commentInfo);
  if (!replyToPost) {
    const updateInfo = {
      commentId: replyId,
      toAddId: docRef.id,
    };
    updateRepliedComment(updateInfo);
  } else {
    const updateInfo = {
      postId: replyId,
      toAddId: docRef.id,
    };
    updateRepliedPost(updateInfo);
  }
  return docRef.id;
};

export default functions.https.onCall(addComment);
