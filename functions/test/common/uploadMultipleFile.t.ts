import 'mocha';
import fs from 'fs';
import { expect } from 'chai';
import { uploadMultipleFile } from '../../func/common/uploadMultipleFileFunc';

describe('Upload multiple file Test', () => {
  it('upload multiple file test', async () => {
    const returnArray = await uploadMultipleFile({
      uid: 'test',
      fname: ['test.jpg', '肌肉泽昊.mp4'],
      file: [fs.readFileSync('./test/testInfo/live_and_create.jpg'), fs.readFileSync('./test/testInfo/肌肉泽昊.mp4')],
    });
    console.log(returnArray);
  });
  it('upload multiple file expect error when file.length = 0', async () => {
    const testData = {
      uid: 'test',
      fname: ['test.jpg', '肌肉泽昊.mp4'],
      file: [],
    };
    await uploadMultipleFile(testData).then(() => {
      expect.fail('file array or fileName array is empty');
    }).catch(() => {
      //nothing
    });
  });
});
