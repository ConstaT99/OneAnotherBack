import { expect } from 'chai';
import 'mocha';
import { db } from '../../db';
import { addCommentFunc } from '../../func/comment/addCommentFunc';

describe('add comment test', () => {
  it('Add comment replying to a post. return true if comment successfully added', async () => {
    const testData = {
      author: 'me',
      content: 'test comment content',
      replyToPost: true,
      replyId: 'wR9n7Q6vF5i1kaep0tuq'
    }
    const returnId = await addCommentFunc(testData);
    const commentRef = db.collection('comment');
    const docRef = await commentRef.doc(returnId).get();
    // @ts-ignore
    expect(docRef.data().author).to.equal('me');
    // @ts-ignore
    expect(docRef.data().content).to.equal('test comment content');
    // @ts-ignore
    expect(docRef.data().replyId).to.equal('wR9n7Q6vF5i1kaep0tuq');
    // @ts-ignore
    expect(docRef.data().replyToPost).to.equal(true);
  })
})
