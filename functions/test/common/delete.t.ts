import 'mocha';
import { expect } from 'chai';
import { deleteFileFunc } from '../../func/common/deleteFileFunc';

describe('delete File Test', () => {
  it('delete file test 1', async () => {
    await deleteFileFunc({ uid: 'test', fname: 'test.jpg' })
      .then(() => {}).catch(() => expect.fail('link was not downloadable'));
  });
});
