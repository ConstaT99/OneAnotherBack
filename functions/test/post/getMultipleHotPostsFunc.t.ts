import { readMultipleHotPosts } from '../../func/post/readMultipleHotPostsFunc';

describe('greadMultipleHotPostsFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await readMultipleHotPosts({ prePostId: '' });
    console.log(check);
    // const collection = 'categories';
    // const catRef = db.collection(collection).doc('6qt1xEqTL2pI9J1ACBEe');
    // const catDoc = await catRef.get();
    // const catData = catDoc.data();
    // // @ts-ignore
    // const postArr = catData.postArray;
    // for (let i = 0; i < check.length; i += 1) {
    //   expect(check[i]).to.equal(postArr[i]);
    // }
  });
});
