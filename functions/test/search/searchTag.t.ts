import 'mocha';
import { searchTag } from '../../func/search/searchTagFunc';

describe('search Tag', () => {
  it('should return macthed tags', async () => {
    const data = {
      input: '时尚',
      preTagId: '',
    };
    const out = await searchTag(data);
    console.log(out);
  });
});
