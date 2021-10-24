import 'mocha';
import { searchUser } from '../../func/search/searchUserFunc';

describe('search Tag', () => {
  it('should return macthed tags', async () => {
    const data = {
      input: 'DongHeng',
      preUid: '',
    };
    const out = await searchUser(data);
    console.log(out);
  });
  it('should return macthed tags', async () => {
    const data = {
      input: '魏港',
      preUid: 'biozmSjdsJXk99P3B5CUZe3CHfR2',
    };
    const out = await searchUser(data);
    console.log(out);
  });
});
