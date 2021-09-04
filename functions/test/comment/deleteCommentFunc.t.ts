// import { expect } from 'chai';
import 'mocha';
// import { db } from '../../db';
import { deleteComment } from '../../func/comment/deleteCommentFunc';

describe('delete comment test', () => {
  it('should be able to delete all of its child. It should also be deleted in corresponding post', async () => {
    const testInfo = await deleteComment({ commentId: 'u6bbwiTy8RUP4J2AVT7i' });
    console.log(testInfo);
  });
});
