// import { expect } from 'chai';

import 'mocha';
import fs from 'fs';
import https from 'https';
import { expect } from 'chai';
import { uploadFileFunc } from '../../func/common/uploadFileFunc';
import { storage } from '../../db';

describe('Uplaod File Test', () => {
  it('uplaod file test', async () => {
    const tmpFile = fs.createWriteStream('/test/common/live_and_create_d.jpg');
    const name = await uploadFileFunc({
      uid: 'testUid',
      fname: 'testFile',
      file: fs.readFileSync('./test/testInfo/live_and_create.jpg'),
    });

    console.log(name);
    const file = await storage.file(name);
    const expiration = new Date();
    expiration.setDate(expiration.getHours() + 7);
    const urls = await file.getSignedUrl({ action: 'read', expires: expiration });
    https.get(urls[0], (response) => {
      if (response.statusCode !== 200) {
        expect.fail('link was not downloadable');
      }
      response.pipe(tmpFile);
      const original = fs.readFileSync('./test/testInfo/live_and_create.jpg');
      const downloaded = fs.readFileSync('./test/common/live_and_create_d.jpg');
      expect(original.compare(downloaded)).to.equal(1);
      fs.unlinkSync('./test/common/live_and_create_d.jpg');
    });
  });
  it('upload test 2', async () => {
    const uploaded = await uploadFileFunc({
      uid: 'test',
      fname: 'test.jpg',
      file: fs.readFileSync('./test/testInfo/live_and_create.jpg'),
    });
    console.log(uploaded);
    // expect(storage.file(uploaded));
  });
});
