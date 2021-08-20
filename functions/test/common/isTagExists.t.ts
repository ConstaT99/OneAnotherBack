import 'mocha';
import { expect } from 'chai';
import { isTagExists } from '../../func/common/isTagExists';

//import { db } from '../../db';

describe('add, read and delete Example Function Test', () => {
    it('read func return right result that test inserted', async () => {
        const testData = {
            name : '香槟美食',
        };
        const testInfo = await isTagExists(testData);
        expect(testInfo).to.equal(true);
    });
});