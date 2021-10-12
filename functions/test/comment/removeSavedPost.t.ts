import 'mocha';
import { removeSavedPost } from '../../func/comment/removeSavedPostFunc';

describe('remove a saved post from folder test', () => {
  it('should delete a post from a existing folder', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      folderName: '默认文件夹',
      postId: 'AzhrPXIzlmD356r6D1lC',
    };
    const out = await removeSavedPost(testInfo);
    console.log(out);
  });
});
