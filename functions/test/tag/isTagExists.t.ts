import 'mocha';
import { expect } from 'chai';
import { isTagExists } from '../../func/tag/isTagExists';

//import { db } from '../../db';

describe('isTagExists function test', () => {
    it('if the tag already exists, it should return true', async () => {
        const testData = {
            name : 'GreenStreetBets',
        };
        const testInfo = await isTagExists(testData);
        //console.log(testInfo);
        expect(testInfo).to.equal(true);
    });
    it('if the tag already exists, it should return true', async () => {
        const testData = {
            name : '香槟美食',
        };
        const testInfo = await isTagExists(testData);
        //console.log(testInfo);
        expect(testInfo).to.equal(true);
    });
    it('if the tag do not exist, it should return false', async () => {
        const testData = {
            name : 'abc',
        };
        const testInfo = await isTagExists(testData);
        //console.log(testInfo);
        expect(testInfo).to.equal(false);
    });
    it('if the tag do not exist, it should return false', async () => {
        const testData = {
            name : 'a12345667',
        };
        const testInfo = await isTagExists(testData);
        //console.log(testInfo);
        expect(testInfo).to.equal(false);
    });
});