import 'mocha'
import { getDirectComment } from '../../func/comment/getDirectCommentFunc';

describe('get first layer of comment in a post test', () => {
    it('Should successfully read first layer comment of a post', async () => {
        const testInfo = {
            postId: 'AzhrPXIzlmD356r6D1lC',
            limit: 0
        }
        const out = await getDirectComment(testInfo);
        console.log(out);
    });
    it('Should successfully read first layer comment of a post with limitation', async () => {
        const testInfo = {
            postId: 'AzhrPXIzlmD356r6D1lC',
            limit: 1
        }
        const out = await getDirectComment(testInfo);
        console.log(out);
    });
});