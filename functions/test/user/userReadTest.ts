import { expect } from 'chai';
import { readUser } from '../../func/user/readUserFunc';
import 'mocha';

describe('User read test', () => {
  it('read user func return right result that test inserted', async () => {
    const testdata = {
      uid: 'Nbcl2gT2XkQpSaO4gnAcJAiS0YF3',
    };
    const userdata = await readUser(testdata);
    if (userdata === undefined) {
      console.log('user is undefined');
      expect(false).to.equal(true); // A stupid test statement
    } else {
      console.log('the user email is ', userdata.email);
    }
  });
});
