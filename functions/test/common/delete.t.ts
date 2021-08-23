import 'mocha';
import {deleteFile} from '../../func/common/delete';

describe('delete File Test', () => {
    it('delete file test 1', async () => {
        const testDelete = await deleteFile({uid: 'test', fname: 'test.jpg'});
        console.log(testDelete);
    });
});