import { expect } from 'chai';
import { db } from '../../db';
import { getPostsByCatFunc } from '../../func/categories/getPostsByCatFunc';

describe('getPostByCatFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await getPostsByCatFunc({ name: '学习' });
    const collection = 'categories';
    const catRefid = db.collection(collection);
    const snapshot = await catRefid.where('catName', '==', '学习').get();
    const catId = snapshot.docs[0].id; // get the catId

    const docRef = await catRefid.doc(catId).get();
    // @ts-ignore
    expect(docRef.data().postArray).to.equal(check);
  });
});
