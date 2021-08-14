import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import * as https from 'https';
import { getSchoolById } from '../../func/school/getSchoolByIdFunc';
import { addSchool } from '../../func/school/addSchoolFunc';
import { db } from '../../db';
import { getAvatarByName } from '../../func/school/getAvatarByName';
import { getAllSchool } from '../../func/school/getAllSchoolFunc';

// I'm not testing delete here since that will remove images in firestore
// Since we don't have a working upload function, I cannot restore it.

const cleanup = async (message: unknown) => {
  // @ts-ignore
  const id = message.split(' ').pop();
  db.collection('school').doc(id).delete()
    .catch((error) => {
      console.log(`fail to clean up after adding test, reason ${error}`);
    });
};

describe('school add tests', () => {
  const data = {
    avatar: '663.211/ajfio.png',
    schoolName: 'a testing school',
  };
  it('should add school', async () => {
    await addSchool(data)
      .then((message) => {
        cleanup(message);
      })
      .catch(() => {
        expect.fail();
      });
  });

  it('should not add duplicate', async () => {
    await addSchool(data)
      .then((message) => {
        cleanup(message);
        expect.fail();
      })
      .catch(() => {
      });
  });

  it('should not add url/school name is too short', async () => {
    data.avatar = '';
    await addSchool(data)
      .then((message) => {
        cleanup(message);
        expect.fail();
      })
      .catch(() => {
      });

    data.avatar = 'alongurl.xyz';
    data.schoolName = ' ';
    await addSchool(data)
      .then((message) => {
        cleanup(message);
        expect.fail();
      })
      .catch(() => {
      });
  });

  it('should not add when fields are invalid', async () => {
    // @ts-ignore
    data.avatar = undefined;
    await addSchool(data)
      .then((message) => {
        cleanup(message);
        expect.fail();
      })
      .catch(() => {
      });
  });
});

// !TODO: convert setup to before
describe('school get tests', async () => {
  // This adds a new entry for following test. Ideally we should upload a new image, but upload is
  // not working yet.
  const data = {
    avatar: 'test.png',
    schoolName: 'yingyingying',
  };
  let toClean: any;
  let ID: any;
  addSchool(data)
    .then((message) => {
      toClean = message;
      // @ts-ignore
      ID = message.split(' ').pop();
    })
    .catch(() => { throw new Error('oops, add school went wrong in setup'); });

  let prevLength : any;
  getAllSchool()
    .then((res) => {
      prevLength = res.length;
    })
    .catch(() => { throw new Error('oops, get all school went wrong in setup'); });

  it('should fetch existing school doc', async () => {
    const schoolDoc = await getSchoolById({ docID: ID });
    if (schoolDoc === undefined) {
      expect.fail('Should read existing school');
    }
    expect(schoolDoc.schoolName).to.equal(data.schoolName);
    expect(schoolDoc.avatar).to.equal(data.avatar);
    // !TODO: compare two actual image
  });

  it('should not fetch non existing schoolDoc', async () => {
    const schoolDoc = await getSchoolById({ docID: '666890fjdsaofhewo' });
    if (schoolDoc !== undefined) {
      expect.fail();
    }
  });

  it('should get all schools', async () => {
    const schoolDoc = await getAllSchool();
    expect(schoolDoc.length).to.equal(prevLength + 1);
    const names = schoolDoc.map((entry) => entry.schoolName);
    expect(names).to.contain(data.schoolName);
    expect(names).to.include('University of Illinois, Urbana-Champaign');
  });

  it('should get avatar link by name', async () => {
    const link = await getAvatarByName({ name: data.schoolName });
    const file = fs.createWriteStream('./test/school/tmp.png');
    https.get(link, (response) => {
      if (response.statusCode !== 200) {
        expect.fail('link was not downloadable');
      }
      response.pipe(file);
      const original = fs.readFileSync('./test/school/test.png');
      const downloaded = fs.readFileSync('./test/school/tmp.png');
      expect(original.compare(downloaded)).to.equal(1);
      fs.unlinkSync('./test/school/tmp.png');
    });
  });

  after(() => { cleanup(toClean); });
});
