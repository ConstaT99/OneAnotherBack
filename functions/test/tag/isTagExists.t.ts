import 'mocha';
import { expect } from 'chai';
import { isTagExists } from '../../func/tag/isTagExistsFunc';

// import { db } from '../../db';

describe('isTagExists function test', () => {
  it('if the tag already exists, it should return true', async () => {
    const testData = {
      name: 'covid-19',
    };
    const testInfo = await isTagExists(testData);
    // console.log(testInfo);
    expect(testInfo).to.equal('iw9MNyLzHjw7r2dwW5cm');
  });
  it('if the tag already exists, it should return true', async () => {
    const testData = {
      name: '香槟美食',
    };
    const testInfo = await isTagExists(testData);
    // console.log(testInfo);
    expect(testInfo).to.equal('Ftt7P4XBi2VxyPOZ5hjU');
  });
  it('if the tag do not exist, it should return false', async () => {
    const testData = {
      name: 'abc',
    };
    const testInfo = await isTagExists(testData);
    // console.log(testInfo);
    expect(testInfo).to.equal(null);
  });
  it('if the tag do not exist, it should return false', async () => {
    const testData = {
      name: 'a12345667',
    };
    const testInfo = await isTagExists(testData);
    // console.log(testInfo);
    expect(testInfo).to.equal(null);
  });
});
