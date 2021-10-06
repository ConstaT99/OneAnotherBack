import { expect } from 'chai';
import 'mocha';
import { db } from '../../db';
import { addComment } from '../../func/comment/addCommentFunc';

describe('add comment test', () => {
  it('Add comment replying to a comment. return true if comment successfully added', async () => {
    const testData = {
      author: 'me',
      content: 'this is a test comment replying to another comment',
      replyToPost: false,
      replyToProductBuy: false,
      replyToProductSell: false,
      replyId: 'IjlIWAJQOAPk3zW88Pa5',
    };
    const returnId = await addComment(testData);
    const commentRef = db.collection('comment');
    const docRef = await commentRef.doc(returnId).get();
    // @ts-ignore
    expect(docRef.data().author).to.equal('me');
    // @ts-ignore
    expect(docRef.data().content).to.equal('this is a test comment replying to another comment');
    // @ts-ignore
    expect(docRef.data().replyId).to.equal('IjlIWAJQOAPk3zW88Pa5');
    // @ts-ignore
    expect(docRef.data().replyToPost).to.equal(false);
  });

  it('Add comment replying to a post. return true if comment successfully added', async () => {
    const testData = {
      author: 'me',
      content: 'this is a test comment replying to a post',
      replyToPost: true,
      replyToProductBuy: false,
      replyToProductSell: false,
      replyId: 'AzhrPXIzlmD356r6D1lC',
    };
    const returnId = await addComment(testData);
    const commentRef = db.collection('comment');
    const docRef = await commentRef.doc(returnId).get();
    // @ts-ignore
    expect(docRef.data().author).to.equal('me');
    // @ts-ignore
    expect(docRef.data().content).to.equal('this is a test comment replying to a post');
    // @ts-ignore
    expect(docRef.data().replyId).to.equal('AzhrPXIzlmD356r6D1lC');
    // @ts-ignore
    expect(docRef.data().replyToPost).to.equal(true);
  });
  it('Add comment replying to a productSell', async () => {
    const testData = {
      author: 'me',
      content: 'this is a test comment replying to a productSell',
      replyToPost: false,
      replyToProductBuy: false,
      replyToProductSell: true,
      replyId: 'WDe8aZKk0arAp2oH9F4S',
    };
    const returnId = await addComment(testData);
    console.log(returnId);

  });
  it('Add comment replying to a productBuy', async () => {
    const testData = {
      author: 'me',
      content: 'this is a test comment replying to a productBuy',
      replyToPost: false,
      replyToProductBuy: true,
      replyToProductSell: false,
      replyId: 'OGNE9HewhF1UbDFXKs9M',
    };
    const returnId = await addComment(testData);
    console.log(returnId);

  });
});
