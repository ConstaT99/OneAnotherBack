import { expect } from 'chai';
import { readPost } from '../../func/post/readPostFunc';
import { addPostFunc } from '../../func/post/addPostFunc';
import 'mocha';
import { updatePostFunc } from '../../func/post/updatePostFunc';
import { deletePostFunc } from '../../func/post/deletePostFunc';
// import { deletePostFunc } from '../../func/post/deletePostFunc';

describe('Post add test', () => {
  const testDataOne = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: 'This is Test Title',
    content: 'This is Test Content',
    image: [null],
    tag: 'covid-19',
    categories: null,
    aStatus: false,
  };

  const testDataTwo = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: null,
    content: 'This is Test Content',
    image: [null],
    tag: 'covid-19',
    categories: null,
    aStatus: false,
  };

  const testDataThree = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: 'This is Test Title',
    content: null,
    image: [null],
    tag: 'covid-19',
    categories: null,
    aStatus: false,
  };

  const testDataFour = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: null,
    content: null,
    image: [null],
    tag: 'covid-19',
    categories: null,
    aStatus: false,
  };

  it('add & update & read & delete test', async () => {
    const resultOne = addPostFunc(testDataOne);
    resultOne.then(() => {
      // pass the test
    }).catch(() => {
      expect.fail();
    });
    const updateDateOne = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      postId: (await resultOne).id,
      updateField: 'content',
      updateContext: 'This is test update content',
    };

    await updatePostFunc(updateDateOne);

    const readData = {
      postId: updateDateOne.postId,
    };

    const myResult = await readPost(readData);
    if (myResult === undefined) {
      expect.fail();
    }
    expect(myResult.content).to.equal(updateDateOne.updateContext);

    const deleteData = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      postId: readData.postId,
    };

    await deletePostFunc(deleteData).then(() => {
      // pass
    }).catch((error) => {
      expect.fail(error);
    });
  });

  it('add Test with no title and no content', async () => {
    addPostFunc(testDataFour).then(() => {
      expect.fail();
    }).catch(() => {
      // Doing Nothing it should raise error
      console.log('raise error here');
    });
  });

  it('add Test with no title and content', async () => {
    const resultTwo = addPostFunc(testDataTwo);
    resultTwo.then(() => {
      // pass the test
    }).catch(() => {
      expect.fail();
    });
    const deleteData = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      postId: (await resultTwo).id,
    };

    await deletePostFunc(deleteData).then(() => {
      // pass
    }).catch((error) => {
      expect.fail(error);
    });
  });

  it('add Test with title and no content', async () => {
    const resultThree = addPostFunc(testDataThree);
    resultThree.then(() => {
      // pass the test
    }).catch(() => {
      expect.fail();
    });

    const deleteData = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      postId: (await resultThree).id,
    };

    await deletePostFunc(deleteData).then(() => {
      // pass
    }).catch((error) => {
      expect.fail(error);
    });
  });
});
