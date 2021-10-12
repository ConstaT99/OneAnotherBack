import 'mocha';
import { getSubComment } from '../../func/comment/getSubCommentFunc';

describe('get sub layer of a comment test', () => {
  it('Should successfully read sub layer of comment under a post', async () => {
    const testInfo = {
      commentId: 'IjlIWAJQOAPk3zW88Pa5',
    };
    const out = await getSubComment(testInfo);
    console.log(out);
  });
});
