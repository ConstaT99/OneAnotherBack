import { expect } from 'chai';
import { db } from '../../db';
import { updateCat } from '../../func/categories/updateCatFunc';

describe('updateCatFunc test', () => {
  it('the postId should be added into the postArray in this category', async () => {
    const testData = {
      catId: '6qt1xEqTL2pI9J1ACBEe',
      postId: 'abcd',
    };
    await updateCat(testData);
    const collection = 'categories';
    const catRef = db.collection(collection).doc(testData.catId);
    const catDoc = await catRef.get();
    const catData = catDoc.data();
    // @ts-ignore
    expect(catData.postArray).contain('abcd');
  });
});