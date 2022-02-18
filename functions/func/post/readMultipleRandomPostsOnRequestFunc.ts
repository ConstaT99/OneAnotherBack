import * as functions from 'firebase-functions';
import { readMultipleRandomPosts } from './readMultipleRandomPostsFunc';

/*
Author: Carstin
The onrequest Function of readMultiplePost function
Input {
    prePostId: the postId of the previou post
}
Output {
    postOutput: limit 10 posts max for each call
}
*/

export const readMultipleRandomPostOnRequest = functions.https.onRequest(async (request, response) => {
    const prePostId = request.query.prePostId as string;
    const postOutPut = await readMultipleRandomPosts({prePostId});
    response.send(postOutPut);
});