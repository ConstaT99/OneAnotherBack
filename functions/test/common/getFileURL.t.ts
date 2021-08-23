import 'mocha';
import fs from 'fs';
import https from 'https';
import { expect } from 'chai';
import {getFileURL} from '../../func/common/getFileURL';

describe('getURL test', () => {
    it('url test 1, should return the url', async () => {
        const testData = {
            file : 'test/test.jpg'
        };
        const tempFile = fs.createWriteStream('./test/common/live_and_create_d.jpg');
        const urls = await getFileURL(testData);
        console.log(urls);
        https.get(urls, (response) => {
            if (response.statusCode !== 200) {
                expect.fail('link was not downloadable');
            }
            response.pipe(tempFile);
            const original = fs.readFileSync('./test/testInfo/live_and_create.jpg');
            const downloaded = fs.readFileSync('./test/common/live_and_create_d.jpg');
            expect(original.compare(downloaded)).to.equal(1);
            fs.unlinkSync('./test/common/live_and_create_d.jpg');
        });
    });
});