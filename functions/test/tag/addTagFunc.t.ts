import 'mocha';
import { expect } from 'chai';
import { addTagFunc } from '../../func/tag/addTagFunc'
import { isTagExists } from '../../func/tag/isTagExists';


describe('addTagFunction test', () => {
    it('the result should be true if the Tag is successfully created', async () => {
        const testData = {
            lastUpdate : Math.floor(Date.now() / 1000), //unix timestamp in seconds
            name: 'covid-19',
            docId: 'wR9n7Q6vF5i1kaep0tuq',
        };
        await addTagFunc(testData);
        const checkExists = await isTagExists({name: 'covid-19'});
        expect(checkExists).to.equal(true);
    });
    it('the result should not be created if the name are the same', async () => {
        const testData = {
            lastUpdate : Math.floor(Date.now() / 1000),
            name: '香槟美食',
            docId: 'wR9n7Q6vF5i1kaep0tuq',
        };
        await addTagFunc(testData); //unix timestamp in seconds
        const checkExists = await isTagExists({name: '香槟美食'});
        expect(checkExists).to.equal(true);
    });
});