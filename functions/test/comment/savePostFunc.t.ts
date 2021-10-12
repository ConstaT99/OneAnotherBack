import 'mocha';
import { savePost } from '../../func/comment/savePostFunc';

describe('save post test', () => {
  it('should add a post to a existed folder', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      folderName: '默认文件夹',
      postId: 'AzhrPXIzlmD356r6D1lC',
    };
    const out = await savePost(testInfo);
    console.log(out);
  });
});
