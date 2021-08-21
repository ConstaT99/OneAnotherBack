import 'mocha';
import { expect } from 'chai';
import { addTagFunc } from '../../func/tag/addTagFunc'
import { isTagExists } from '../../func/tag/isTagExists';


describe('addTagFunction test', () => {
    it('the result should be true if the Tag is successfully created', async () => {
        const testData = {
            name: 'GreenStreetBets',
            docId: 'wR9n7Q6vF5i1kaep0tuq',
        };
        await addTagFunc(testData);
        const checkExists = await isTagExists({name: 'GreenStreetBets'});
        expect(checkExists).to.equal(true);
    });
});