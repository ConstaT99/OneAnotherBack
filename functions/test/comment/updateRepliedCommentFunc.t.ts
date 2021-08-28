import { expect } from 'chai';
import 'mocha';
import { updateRepliedCommentFunc } from '../../func/comment/updateRepliedCommentFunc';

describe('update comment s repliedBy test', () => {
  it('Add comment replying to a post. return true if comment successfully added', async () => {
    const testData = {
      commentId: '4HIaiATrkZOGi17S3oiS',
      toAddId: 'Y04pIkcsz0d2duQUFYy4',
    };
    const commentData = await updateRepliedCommentFunc(testData);
    // @ts-ignore
    expect(commentData.repliedBy.indexOf('Y04pIkcsz0d2duQUFYy4')).equal(0);
  });
});
