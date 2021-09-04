// import { expect } from 'chai';
// import { db } from '../../db';
import 'mocha';
import { getTenHotTags } from '../../func/hot-tags/getTenHotTagsFunc';

describe('getTenHotTagsFunc test', () => {
  it('Ten hotTags', async () => {
    const test = await getTenHotTags();
    console.log(test);
  });
});
