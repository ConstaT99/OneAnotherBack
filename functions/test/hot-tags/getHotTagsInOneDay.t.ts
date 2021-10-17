import 'mocha';
import { getHotTagsInOneDay } from '../../func/hot-tags/getHotTagsInOneDayFunc';

describe('get hot tags in One day test', () => {
  it('simple test', async () => {
    const out = await getHotTagsInOneDay();
    console.log(out);
  });
});
