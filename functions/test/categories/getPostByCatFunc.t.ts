import { expect } from 'chai';
import { db } from '../../db';
import { getPostsByCat } from '../../func/categories/getPostsByCatFunc';

describe('getPostByCatFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await getPostsByCat({ catId: 'u786Ts8fYiKkhgJmzlve' });
    const collection = 'categories';
    const catRef = db.collection(collection).doc('u786Ts8fYiKkhgJmzlve');
    const catDoc = await catRef.get();
    const catData = catDoc.data();
    // @ts-ignore
    expect(catData.postArray).to.equal(check);
  });
});
