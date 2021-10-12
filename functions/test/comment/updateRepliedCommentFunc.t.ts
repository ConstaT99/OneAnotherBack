import { expect } from 'chai';
import 'mocha';
import { updateRepliedComment } from '../../func/comment/updateRepliedCommentFunc';

describe('update comment s repliedBy test', () => {
  it('update the child comments of a parent comment. Return true if successfully updated.', async () => {
    const testData = {
      commentId: 'NpDGJHvpKhbvX1u4nzE2',
      toAddId: 'WnNTViczxUlrVlIDFMZt',
    };
    const commentData = await updateRepliedComment(testData);
    // @ts-ignore
    expect(commentData.repliedBy.indexOf('WnNTViczxUlrVlIDFMZt')).to.not.equal(-1);
  });
});
