import 'mocha';
import { addPost } from '../../func/post/addPostFunc';


describe('add Post', () => {
    it('should succefully add a post', async () => {
      const testInfo = {
        uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
        title: 'This is Test Title',
        content: '👌',
        image: [],
        tag: 'covid-19',
        categories: '6qt1xEqTL2pI9J1ACBEe',
        aStatus: false,
      };
      const out = await addPost(testInfo);
      console.log(out);
    });
});