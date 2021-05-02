// /* eslint-disable no-undef */
import { expect } from 'chai';
import { addVideo } from '../../func/video/addVideoFunc';
// import { readVideo } from '../../func/video/readVideoFunc';
// import { deleteVideo }from '../../func/video/deleteVideoFunc';
import 'mocha';
import * as testinfo from '../testInfo/testInfo';

// const filepath = '../testInfo/live_and_create.jpg';

describe('addvideo Test', () => {
  it('add video test', async () => {
    const testData = {
      userId: testinfo.TEST_DOC_ID,
      url: testinfo.TEST_URL_PIC,
    };
    const testRef = await addVideo(testData);
    expect(!(await testRef.get()).exists).to.equal(false);
  });
});
