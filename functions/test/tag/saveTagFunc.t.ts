import 'mocha';
import { saveTag } from '../../func/tag/saveTagFunc';

describe('save Tag function test', () => {
  it('the tag should be saved in user profile', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      tagName: '香槟美食',
    };
    const out = await saveTag(testInfo);
    console.log(out);
  });
});
