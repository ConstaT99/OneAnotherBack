// import { expect } from 'chai';
// import { db } from '../../db';
import { getPostsByCat } from '../../func/categories/getPostsByCatFunc';

describe('getPostByCatFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await getPostsByCat({ prePostId: '', catId: '6qt1xEqTL2pI9J1ACBEe' });
    console.log(check);
  });
});
