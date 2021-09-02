import 'mocha';
import fs from 'fs';
import { uploadMultipleFile } from '../../func/common/uploadMultipleFileFunc';

describe('Upload multiple file Test', () => {
  it('upload multiple file test', async () => {
    await uploadMultipleFile({
      uid: 'test',
      fname: ['test.jpg', '肌肉泽昊.mp4'],
      file: [fs.readFileSync('./test/testInfo/live_and_create.jpg'), fs.readFileSync('./test/testInfo/肌肉泽昊.mp4')],
    });
  });
});
