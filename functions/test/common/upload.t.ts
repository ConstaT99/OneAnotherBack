// import { expect } from 'chai';

import 'mocha';
import fs from 'fs';
// import https from 'https';
// import { expect } from 'chai';
import { upload } from '../../func/common/upload';
// import { storage } from '../../db';
// import * as testinfo from '../testInfo/testInfo';

describe('Uplaod File Test', () => {
  // it('up;aod file test', async () => {
  //   const name = await upload({ file: './test/school/test.png' });
  //   console.log(name);
  //   const file = await storage.file(name);
  //   const expiration = new Date();
  //   expiration.setDate(expiration.getHours() + 7);
  //   const urls = await file.getSignedUrl({ action: 'read', expires: expiration });
  //   const tmpFile = fs.createWriteStream('./test/common/tmp.png');
  //   https.get(urls[0], (response) => {
  //     if (response.statusCode !== 200) {
  //       expect.fail('link was not downloadable');
  //     }
  //     response.pipe(tmpFile);
  //     const original = fs.readFileSync('./test/school/test.png');
  //     const downloaded = fs.readFileSync('./test/common/tmp.png');
  //     expect(original.compare(downloaded)).to.equal(1);
  //     fs.unlinkSync('./test/common/tmp.png');
  //   });
  // });
  it ('upload test 2', async () => {
    await upload({uid:'233', fname:"fjaewio", file:fs.readFileSync('./test/school/test.png')});
    console.log('?');
  })
});
