/* eslint-disable no-undef */
import { expect } from 'chai';
import { addExample } from '../../func/template/addFuncExample';
import { readExample } from '../../func/template/readFuncExample';
import 'mocha';

// import {db} from "../../func/db";

describe('add, read and delete Example Function Test', () => {
  it('read func return right result that test inserted', async () => {
    const testData = {
      sampleId: '12314',
      text: 'Hello',
    };
    const testRef = await addExample(testData);// add the testData to collection
    const testRead = await readExample({
      docID: testRef.id,
      field: 'text',
    });
    expect(testRead).to.equal('Hello');
  });
  it('delete function work correctly', async () => {
  });
});
