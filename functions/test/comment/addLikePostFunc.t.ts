import 'mocha';
import { addLikePost } from '../../func/comment/addLikePostFunc';


describe('add Like to post test', () => {
    it('should succefully add like to post', async () => {
        const testInfo = {
            uid: "5ZmuqJeFzjUWfRNUq44W1JTi55e2",
            postId:"AzhrPXIzlmD356r6D1lC",
        }
        const out = await addLikePost(testInfo);
        console.log(out);
    });
});