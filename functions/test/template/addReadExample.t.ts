/* eslint-disable no-undef */
import { expect } from 'chai';
import { addExample } from '../../func/template/addFuncExample';
import { readExample } from '../../func/template/readFuncExample';
import { deleteExample } from '../../func/template/deleteFuncExamlple';
import 'mocha';

import { db } from '../../db';

describe('add, read and delete Example Function Test', () => {
  it('read func return right result that test inserted', async () => {
    const testData = {
      sampleId: '12314',
      text: 'Hello',
    };
    const testRef = await addExample(testData);// add the testData to collection
    const testID = testRef.id;
    const testRead = await readExample({
      docID: testID,
      field: 'text',
    });
    expect(testRead).to.equal('Hello');
    const deleteData = {
      docID: testID,
    };
    deleteExample(deleteData);// delete the testref
    const deleteExampleRef = db.collection('test').doc(testID);
    expect(!(await deleteExampleRef.get()).exists).to.equal(true);
  });
});
