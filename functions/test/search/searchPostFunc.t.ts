import 'mocha';
import { searchPosts } from '../../func/search/searchPostsFunc';

describe('search post', () => {
    it('search posts by key words title', async () => {
        const data = {
            input: "👌",
            prePostId: '',
            title: true,
        };
        const out = await searchPosts(data);
        console.log(out);
    });
    it('search posts by key words content', async () => {
        const data = {
            input: "👌",
            prePostId: '',
            title: false,
        };
        const out = await searchPosts(data);
        console.log(out);
    });
    it('search posts by key words content, with prepostId', async () => {
        const data = {
            input: "👌",
            prePostId: 'YBGYxqaLhi1u2UVUZipN',
            title: false,
        };
        const out = await searchPosts(data);
        console.log(out);
    });
});