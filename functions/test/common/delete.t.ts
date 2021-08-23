import 'mocha';
import { expect } from 'chai';
import {deleteFile} from '../../func/common/delete';

describe('delete File Test', () => {
    it('delete file test 1', async () => {
        await deleteFile({uid: 'test', fname: 'test.jpg'}).then(()=>{}).catch(()=>expect.fail());
    });
});