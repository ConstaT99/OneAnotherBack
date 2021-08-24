import { expect } from 'chai';
import { db } from '../../db';
import { updateCatFunc } from '../../func/categories/updateCatFunc';


describe('updateCatFunc test', () => {
  it('the postId should be added into the postArray in this category', async () => {
    const testData = {
      name: '兴趣',
      postId: 'abcd'
    }
    await updateCatFunc(testData);
    const collection = 'categories';
    const catRefid = db.collection(collection);
    const snapshot = await catRefid.where('catName', '==', testData.name).get();
    const catId = snapshot.docs[0].id; //get the catId

    const docRef = await catRefid.doc(catId).get();
    //@ts-ignore
    expect(docRef.data().postArray).contain('abcd');
  });
});