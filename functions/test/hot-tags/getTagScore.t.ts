import 'mocha';
// import { expect } from 'chai';
import { getTagScore } from '../../func/hot-tags/getTagScore';

describe('getTagScore function test', () => {
  it('posts vector with size of three', async () => {
    const testData = {
      tagId: 'k1T1dkrCsPtqPzK0G1Gp',
    };
    const testInfo = await getTagScore(testData);
    console.log('testInfo :', testInfo);
  });

  it('posts vector with size of one', async () => {
    const testData = {
      tagId: 'iw9MNyLzHjw7r2dwW5cm',
    };
    const testInfo = await getTagScore(testData);
    console.log('testInfo :', testInfo);
  });

  it('another post vector with size of one', async () => {
    const testData = {
      tagId: '0ClMf6MdGpz65vaoW4iR',
    };
    const testInfo = await getTagScore(testData);
    console.log('testInfo :', testInfo);
  });
});
