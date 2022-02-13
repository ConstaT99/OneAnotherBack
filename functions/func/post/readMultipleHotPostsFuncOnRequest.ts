import { readMultipleHotPosts } from '../post/readMultipleHotPostsFunc';
import * as functions from 'firebase-functions';

/*
Author @Carstin
The on request function for readMultipleHotPosts
Input {
    prePostId: the postId of the previous array
}
Output {
    HotpostOutput: limit 10 posts per each out come
}
*/

export const readMultipleHotPostsOnRequest = functions.https.onRequest(async (request, response) => {
    const prePostId = request.query.prePostId as string;
    const hotPostsOutPut = readMultipleHotPosts({prePostId});
    response.send(hotPostsOutPut);
});