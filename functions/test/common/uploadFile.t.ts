import { expect } from 'chai';

import 'mocha';
import fs from 'fs';
import https from 'https';
import { uploadFile } from '../../func/common/uploadFileFunc';
import { getFileUrl } from '../../func/common/getFileUrlFunc';

describe('Upload File Test', () => {
  it('upload file test', async () => {
    const tmpFile = fs.createWriteStream('./test/common/live_and_create_d.jpg');
    const fileRef = await uploadFile({
      uid: 'test',
      fname: 'test.jpg',
      file: fs.readFileSync('./test/testInfo/live_and_create.jpg'),
    });

    console.log(fileRef);
    const url = await getFileUrl({ file: fileRef });
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        expect.fail('link was not downloadable');
      }
      response.pipe(tmpFile);
      const original = fs.readFileSync('./test/testInfo/live_and_create.jpg');
      const downloaded = fs.readFileSync('./test/common/live_and_create_d.jpg');
      expect(original.compare(downloaded)).to.equal(1);
    });
  });
});
