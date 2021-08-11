/* eslint-disable @typescript-eslint/no-unused-vars */
// import { expect } from 'chai';
// import * as functions from 'firebase-functions';
import { readUser } from '../../func/user/readUserFunc';
import 'mocha';
// import { test } from '../testInit';

describe('read and delete Example Function Test', () => {
  it('read user func return right result that test inserted', async () => {
    const testdata = {
      uid: 'Nbcl2gT2XkQpSaO4gnAcJAiS0YF3',
    };
    const userdata = await readUser(testdata);
    if (userdata === undefined) {
      console.log('user is undefined');
    } else {
      console.log('the user is ', userdata.email);
    }
  });
});
