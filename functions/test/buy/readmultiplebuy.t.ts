import { readMultipleRandomBuy } from '../../func/productBuy/readMultipleRandomBuy';

describe('greadMultipleRandomPostsFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await readMultipleRandomBuy({ prebuyId: '' });
    console.log(check);
    const check2 = await readMultipleRandomBuy({ prebuyId: 'Vhdp5IULwNIKhsNJiP0O' });
    console.log(check2);
  });
});
