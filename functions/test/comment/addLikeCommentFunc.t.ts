import 'mocha';
import { addLikeComment } from '../../func/comment/addLikeCommentFunc';

describe('add Like to comment test', () => {
  it('should succefully add like to post', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      commentId: 'IjlIWAJQOAPk3zW88Pa5',
    };
    const out = await addLikeComment(testInfo);
    console.log(out);
  });
});
