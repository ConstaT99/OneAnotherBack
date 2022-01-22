import 'mocha';
import { uploadSchool } from '../../func/school/uploadSchoolFunc';
import { readFileSync } from 'fs';

describe('upload school names and avatars test', () => {
  it('upload school names and avatars test', async () => {
    const schoolNames = readFileSync('./schoolinfo/names.txt', 'utf8').split('\n');
    const avatarNames = readFileSync('./schoolinfo/pictureNameIndex.txt', 'utf8').split('\n');
    const path = './schoolinfo/logos/';
    let count = 0;
    for await (var avatarName of avatarNames) {
      await uploadSchool({
        uid: avatarName,
        fname: avatarName+ '.PNG',
        fileLocation: path + avatarName + '.PNG',
        schoolName: schoolNames[count],
      });
      count+=1;
    }
  });
});
