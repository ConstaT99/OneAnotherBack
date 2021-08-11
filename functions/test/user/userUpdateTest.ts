import { expect } from 'chai';
import { readUser } from '../../func/user/readUserFunc';
/* eslint-disable @typescript-eslint/no-unused-vars */
// import * as functions from 'firebase-functions';
import { updateUser } from '../../func/user/updateUserFunc';
import 'mocha';

describe('read and delete Example Function Test', () => {
  it('read user func return right result that test inserted', async () => {
    const testdata = {
      uid: 'Nbcl2gT2XkQpSaO4gnAcJAiS0YF3',
      updateField: 'userName',
      updateContext: 'Constantine T',
    };
    await updateUser(testdata);
    const userdata = await readUser(testdata);
    if (userdata === undefined) {
      return false;
    }
    expect(userdata.userName).to.equal(testdata.updateContext);
    return 0;
  });
});
