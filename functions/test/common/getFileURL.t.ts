import 'mocha';
import fs from 'fs';
import https from 'https';
import { expect } from 'chai';
import {getFileURL} from '../../func/common/getFileURL';

describe('getURL test', () => {
    it('url test 1, should return the url', async () => {
        const testData = {
            file : 'test/test.png'
        };
        const tempFile = fs.createWriteStream('./test/common/tmp.png');
        const urls = await getFileURL(testData);
        console.log(urls);
        https.get(urls, (response) => {
            if (response.statusCode !== 200) {
                expect.fail('link was not downloadable');
            }
            response.pipe(tempFile);
            const original = fs.readFileSync('./test/school/test.png');
            const downloaded = fs.readFileSync('./test/common/tmp.png');
            expect(original.compare(downloaded)).to.equal(1);
            fs.unlinkSync('./test/common/tmp.png');
        });
    });
});