import 'mocha';
import { removeSavedTag } from '../../func/tag/removeSavedTagsFunc';

describe('remove Tag function test', () => {
  it('the tag should be saved in user profile', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      tagName: '香槟美食',
    };
    const out = await removeSavedTag(testInfo);
    console.log(out);
  });
});
