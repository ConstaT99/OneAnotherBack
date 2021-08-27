import 'mocha';
import { expect } from 'chai';
import { isUserExists } from '../../func/common/isUserExists';

// import { db } from '../../db';

describe('isUserExists function test', () => {
  it('if the user already exists, it should return true', async () => {
    const testData = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
    };
    const testInfo = await isUserExists(testData);
    console.log(testInfo);
    expect(testInfo).to.equal(true);
  });
  it('if the user does not exist, it should return false', async () => {
    const testData = {
      uid: 'abc',
    };
    const testInfo = await isUserExists(testData);
    console.log(testInfo);
    expect(testInfo).to.equal(false);
  });
});
