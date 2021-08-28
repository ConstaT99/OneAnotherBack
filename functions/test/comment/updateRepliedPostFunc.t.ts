import { expect } from 'chai';
import 'mocha';
import { updateRepliedPostFunc } from '../../func/comment/updateRepliedPostFunc';

describe('update post s child comment test', () => {
  it ('update the child comments of a parent post. Return true if successfully updated.', async () => {
    const testData = {
      postId: 'wR9n7Q6vF5i1kaep0tuq',
      toAddId: '4HIaiATrkZOGi17S3oiS',
    };
    const postData = await updateRepliedPostFunc(testData);
    // @ts-ignore
    expect(postData.comment.indexOf('4HIaiATrkZOGi17S3oiS')).to.not.equal(-1);
  })
});