import { expect } from 'chai';
import 'mocha';
import { updateRepliedPost } from '../../func/comment/updateRepliedPostFunc';

describe('update post s child comment test', () => {
  it('update the child comments of a parent post. Return true if successfully updated.', async () => {
    const testData = {
      postId: 'AzhrPXIzlmD356r6D1lC',
      toAddId: 'NpDGJHvpKhbvX1u4nzE2',
    };
    const postData = await updateRepliedPost(testData);
    // @ts-ignore
    expect(postData.comment.indexOf('NpDGJHvpKhbvX1u4nzE2')).to.not.equal(-1);
  });
});
