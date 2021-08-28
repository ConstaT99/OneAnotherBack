import { expect } from 'chai';
import 'mocha';
import { db } from '../../db';
import { addCommentFunc } from '../../func/comment/addCommentFunc';

describe('add comment test', () => {
  it('Add comment replying to a comment. return true if comment successfully added', async () => {
    const testData = {
      author: 'me',
      content: 'this is a test comment replying to another comment',
      replyToPost: false,
      replyId: '4HIaiATrkZOGi17S3oiS',
    };
    const returnId = await addCommentFunc(testData);
    const commentRef = db.collection('comment');
    const docRef = await commentRef.doc(returnId).get();
    // @ts-ignore
    expect(docRef.data().author).to.equal('me');
    // @ts-ignore
    expect(docRef.data().content).to.equal('this is a test comment replying to another comment');
    // @ts-ignore
    expect(docRef.data().replyId).to.equal('4HIaiATrkZOGi17S3oiS');
    // @ts-ignore
    expect(docRef.data().replyToPost).to.equal(false);
  });
});
