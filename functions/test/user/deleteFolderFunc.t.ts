import 'mocha';
import { deleteFolder } from '../../func/user/deleteFolderFunc';

describe('remove Folder test', () => {
  it('should delete a existed folder', async () => {
    const testInfo = {
      uid: '5ZmuqJeFzjUWfRNUq44W1JTi55e2',
      folderName: '新建文件夹',
    };
    const out = await deleteFolder(testInfo);
    console.log(out);
  });
});
