import { expect } from 'chai';
import { isCatExists } from '../../func/categories/isCatExists';

describe('isCatExists test', () => {
  it('expect false if this Cat does not exist', async () => {
    const check = await isCatExists({ name: '不存在的分类' });
    expect(check).to.equal(false);
  });
  it('expect true if this tag exists', async () => {
    const check = await isCatExists({ name: '生活' });
    expect(check).to.equal(true);
  });
});
