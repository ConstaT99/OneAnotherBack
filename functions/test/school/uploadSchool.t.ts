//import { expect } from 'chai';

import 'mocha';
import { uploadSchool } from '../../func/school/uploadSchoolFunc';

describe('upload school names and avatars test', () => {
  it('upload school names and avatars test', async () => {
    await uploadSchool({
      uid: 'boston_college',
      fname: 'boston_college.PNG',
      fileLocation: './schoolinfo/logos/boston_college.PNG',
      schoolName: '波士顿学院（Boston College）',
    });
  });
});