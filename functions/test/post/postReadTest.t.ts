import { expect } from 'chai';
import { readPost } from '../../func/post/readPostFunc';
import 'mocha';

describe('Post read test', () => {
  const testdata = {
    postId: '0HZGUlIV9VrGTAIS8Gim',
  };

  it('should read successfully for existing post', async () => {
    const postdata = await readPost(testdata);
    if (postdata === undefined) {
      expect.fail('post is undefined');
    } else {
      expect(postdata.uid).to.equal('CmSdt5xeSKfZiAw84ye1PC8zOjf2');
    }
  });

  it('should get undefined for non-existing posts', async () => {
    testdata.postId = 'something random';
    expect(await readPost(testdata)).to.equal(undefined);
  });
});
