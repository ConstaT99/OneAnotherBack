import 'mocha';
import { removeLikeComment } from '../../func/comment/removeLikeCommentFunc';

describe('remove Like from comment test', () => {
    it('should succefully remove like from comment', async () => {
        const testInfo = {
            uid: "5ZmuqJeFzjUWfRNUq44W1JTi55e2",
            commentId:"IjlIWAJQOAPk3zW88Pa5",
        }
        const out = await removeLikeComment(testInfo);
        console.log(out);
    });
});