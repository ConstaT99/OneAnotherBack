import { expect } from 'chai';
import { readUser } from '../../func/user/readUserFunc';
import { updateUser } from '../../func/user/updateUserFunc';
import 'mocha';

describe('User update test', () => {
  const testdata = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    updateField: 'userName',
    updateContext: `abc123\r${Date()}`,
  };

  it('should update user name successfully', async () => {

    // First we track old name
    let userdata = await readUser(testdata);
    if (userdata === undefined) {
      expect.fail('user is undefined');
    }
    const oldUserName = userdata.userName;

    // We then update and check if the name is updated properly
    await updateUser(testdata);
    userdata = await readUser(testdata);
    if (userdata === undefined) {
      expect.fail('user is undefined');
    }
    expect(userdata.userName).to.equal(testdata.updateContext);

    // Restore original name
    testdata.updateContext = oldUserName;
    await updateUser(testdata);
    userdata = await readUser(testdata);
    if (userdata === undefined) {
      expect.fail('user is undefined');
    }
    expect(userdata.userName).to.equal(oldUserName);
  });

  it('should reject null field', async () => {
    // @ts-ignore
    testdata.updateField = null;
    await updateUser((testdata))
      .then(() => {
        expect.fail('Not suppose to update for null context');
      })
      .catch(() => {
      });
  });

  it('should reject non existing field', async () => {

    testdata.updateField = '';

    await updateUser((testdata))
      .then(() => {
        expect.fail('Not suppose to update for empty field');
      })
      .catch(() => {
      });

    testdata.updateField = 'LOL';

    await updateUser((testdata))
      .then(() => {
        expect.fail('Not suppose to update for non existing field');
      })
      .catch(() => {
      });
  });
});
