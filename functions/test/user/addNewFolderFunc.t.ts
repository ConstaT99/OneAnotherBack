import 'mocha';
import {addNewFolder} from '../../func/user/addNewFolderFunc';

describe('add NewFolder test', () => {
    it('should add a new folder', async () => {
        const testInfo = {
            uid: "5ZmuqJeFzjUWfRNUq44W1JTi55e2",
            newAddedName: "新建文件夹"
        };
        const out = await addNewFolder(testInfo);
        console.log(out);
    });
});