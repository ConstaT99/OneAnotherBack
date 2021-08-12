import { expect } from 'chai';
import { readUser } from '../../func/user/readUserFunc';
import 'mocha';

describe('User read test', () => {
  const testdata = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
  };

  it('should read successfully for existing user', async () => {
    const userdata = await readUser(testdata);
    if (userdata === undefined) {
      expect.fail('user is undefined'); // A stupid test statement
    } else {
      expect(userdata.email).to.equal('trnjerrycostantine@gmail.com');
    }
  });

  it('should get undefined for non-existing user', async () => {
    testdata.uid = '666';
    expect(await readUser(testdata)).to.equal(undefined);
  });
});
