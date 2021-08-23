import { expect } from 'chai';
import { readPost } from '../../func/post/readPostFunc';
import 'mocha';

describe('Post read test', () => {
    const testdata = {
        postId: 'wR9n7Q6vF5i1kaep0tuq'
    };

    it('should read successfully for existing post', async () => {
        const postdata = await readPost(testdata);
        if (postdata === undefined) {
            expect.fail('post is undefined');
        } else {
            expect(postdata.user).to.equal('user/mSbpvEkIwD8jqj3IwUOh');
        }
    });

    it('should get undefined for non-existing posts', async () => {
        testdata.postId = "something random";
        expect(await readPost(testdata)).to.equal(undefined);
    });
});