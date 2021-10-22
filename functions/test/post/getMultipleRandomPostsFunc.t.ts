import { readMultipleRandomPosts } from '../../func/post/readMultipleRandomPostsFunc';

describe('greadMultipleRandomPostsFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await readMultipleRandomPosts({ prePostId: '' });
    console.log(check);
    const check2 = await readMultipleRandomPosts({ prePostId: 'PffLIMK9QNe4CXFtS4d6' });
    console.log(check2);
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
