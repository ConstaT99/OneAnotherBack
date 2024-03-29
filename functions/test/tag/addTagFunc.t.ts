import 'mocha';
import { expect } from 'chai';
import { addTag } from '../../func/tag/addTagFunc';
import { db } from '../../db';
import { isTagExists } from '../../func/tag/isTagExistsFunc';

describe('addTagFunction test', () => {
  it('the result should be true if the Tag is successfully created', async () => {
    const testData = {
      name: 'NewAddedTag',
      postId: 'wR9n7Q6vF5i1kaep0tuq',
    };
    const returnID = await addTag(testData);
    const tagRef = db.collection('tag');
    const docRef = await tagRef.doc(returnID).get();
    // @ts-ignore
    expect(docRef.data().name).to.equal('NewAddedTag');
    // @ts-ignore
    expect(docRef.data().posts).contain('wR9n7Q6vF5i1kaep0tuq');
    expect(returnID).to.equal(await isTagExists({ name: testData.name }));
    db.collection('tag').doc(returnID).delete();
  });
  it('the result should not be created if the name are the same', async () => {
    const testData = {
      name: '香槟美食',
      postId: 'wR9n7Q6vF5i1kaep0tuq',
    };
    const returnID = await addTag(testData);
    const tagRef = db.collection('tag');
    const docRef = await tagRef.doc(returnID).get();
    // @ts-ignore
    expect(docRef.data().name).to.equal('香槟美食');
    // @ts-ignore
    expect(docRef.data().posts).contain('wR9n7Q6vF5i1kaep0tuq');
    expect(returnID).to.equal(await isTagExists({ name: testData.name }));
  });
});
