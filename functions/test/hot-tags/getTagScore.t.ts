import 'mocha';
//import { expect } from 'chai';
import { getTagScore } from '../../func/hot-tags/getTagScore';

// import { db } from '../../db';

describe('getTagScore function test', () => {
  it('posts vector with size of two', async () => {
    const testData = {
      tagId: 'k1T1dkrCsPtqPzK0G1Gp',
    };
    const testInfo = await getTagScore(testData);
    console.log(testInfo);
    //expect(testInfo).to.equal(33);
  });
});
