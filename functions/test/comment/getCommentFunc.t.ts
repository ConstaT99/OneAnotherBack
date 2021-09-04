import { expect } from 'chai';
import 'mocha';
import { getComment } from '../../func/comment/getCommentFunc';

describe('get comment test', () => {
  it('Should successfully read a comment', async () => {
    const returnData = await getComment('4HIaiATrkZOGi17S3oiS');
    // @ts-ignore
    expect(returnData.content).to.equal('this is a comment that replied to a post');
    // @ts-ignore
    expect(returnData.author).to.equal('5ZmuqJeFzjUWfRNUq44W1JTi55e2');
  });
});
