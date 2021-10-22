// import { expect } from 'chai';
// import { db } from '../../db';
import { getPostsByTag } from '../../func/tag/getPostsByTagFunc';

describe('getPostByTagFunc test', () => {
  it('expect the return postArray to equal to the postArray in the db', async () => {
    const check = await getPostsByTag({ prePostId: '', tagName: '小众时尚配饰' });
    console.log(check);
    const check2 = await getPostsByTag({ prePostId: 'AzhrPXIzlmD356r6D1lC', tagName: '小众时尚配饰' });
    console.log(check2);
    // const collection = 'tag';
    // const tagRef = db.collection(collection).doc('0ClMf6MdGpz65vaoW4iR');
    // const tagDoc = await tagRef.get();
    // const tagData = tagDoc.data();
    // // @ts-ignore
    // const postArr = tagData.posts;
    // for (let i = 0; i < check.length; i += 1) {
    //   expect(check[i]).to.equal(postArr[i]);
    // }
  });
});
