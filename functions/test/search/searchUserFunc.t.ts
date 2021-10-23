import 'mocha';
import { searchUser } from '../../func/search/searchUserFunc';

describe('search Tag', () => {
  it('should return macthed tags', async () => {
    const data = {
      input: 'DongHeng',
    };
    const out = await searchUser(data);
    console.log(out);
  });
});
