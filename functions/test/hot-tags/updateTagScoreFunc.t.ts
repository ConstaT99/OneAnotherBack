// import { expect } from 'chai';
// import { db } from '../../db';
import { updateTagScore } from '../../func/hot-tags/updateTagScoreFunc';

describe('updateTagScoreFunc test', () => {
  it('simple test', async () => {
    const testData = {
      tagId: '0ClMf6MdGpz65vaoW4iR',
    };
    const out = await updateTagScore(testData);
    console.log(out);
    // const tagRef = db.collection('tag').doc(testData.tagId);
    // const tagDoc = await tagRef.get();
    // const tagData = tagDoc.data();
    // // @ts-ignore
    // const { tagScore } = tagData;
    // 41.25 post score
    // @ts-ignore
    // expect(postScore).to.equal(41.25);
  });
});
