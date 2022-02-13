import 'mocha';
import { removeLikePost } from '../../func/comment/removeLikePostFunc';

describe('remove Like from Post test', () => {
  it('should succefully remove like from Post', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      postId: 'AzhrPXIzlmD356r6D1lC',
    };
    const out = await removeLikePost(testInfo);
    console.log(out);
  });
});
