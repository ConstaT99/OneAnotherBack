/* eslint-disable no-undef */
import { expect } from 'chai';
import {addVideo, deleteVideo} from '../../src/index';
import 'mocha';

// import {db} from "../../func/db";

describe('add and read Example Function Test', () => {
  it('read func return right result that test inserted', async () => {
    const testData = {
      sampleId: '12314',
      text: 'Hello',
    };
    const testRef = await addVideo(testData);// add the testData to collection
    const testRead = await readExample({
      docID: testRef.id,
      field: 'text',
    });
    expect(testRead).to.equal('Hello');
  });
});
