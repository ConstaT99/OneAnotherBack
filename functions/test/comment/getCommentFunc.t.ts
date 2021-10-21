import { expect } from 'chai';
import 'mocha';
import { getComment } from '../../func/comment/getCommentFunc';

describe('get comment test', () => {
  it('Should successfully read a comment', async () => {
    const returnData = await getComment('NpDGJHvpKhbvX1u4nzE2');
    // @ts-ignore
    expect(returnData.content).to.equal('this is a test comment replying to a post');
    // @ts-ignore
    expect(returnData.author).to.equal('me');
  });
});
