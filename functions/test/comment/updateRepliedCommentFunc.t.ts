import { expect } from 'chai';
import 'mocha';
import { updateRepliedComment } from '../../func/comment/updateRepliedCommentFunc';

describe('update comment s repliedBy test', () => {
  it('update the child comments of a parent comment. Return true if successfully updated.', async () => {
    const testData = {
      commentId: '4HIaiATrkZOGi17S3oiS',
      toAddId: 'Y04pIkcsz0d2duQUFYy4',
    };
    const commentData = await updateRepliedComment(testData);
    // @ts-ignore
    expect(commentData.repliedBy.indexOf('Y04pIkcsz0d2duQUFYy4')).to.not.equal(-1);
  });
});
