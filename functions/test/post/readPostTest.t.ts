import { expect } from 'chai';
import { readPost } from '../../func/post/readPostFunc';
import { addPostFunc } from '../../func/post/addPostFunc';
import 'mocha';
import { updatePostFunc } from '../../func/post/updatePostFunc';

describe('Post add test', () => {
  const testDataOne = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: 'This is Test Title',
    content: 'This is Test Content',
    image: [null],
    tag: 'iw9MNyLzHjw7r2dwW5cm',
    categories: null,
  };

  const testDataTwo = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: null,
    content: 'This is Test Content',
    image: [null],
    tag: 'iw9MNyLzHjw7r2dwW5cm',
    categories: null,
  };

  const testDataThree = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: 'This is Test Title',
    content: null,
    image: [null],
    tag: 'iw9MNyLzHjw7r2dwW5cm',
    categories: null,
  };

  const testDataFour = {
    uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
    title: null,
    content: null,
    image: [null],
    tag: 'iw9MNyLzHjw7r2dwW5cm',
    categories: null,
  };

  it('Easy add & update test', async () => {
    const resultOne = addPostFunc(testDataOne);
    resultOne.then(() => {
      // console.log(snapshot);
    }).catch(() => {
      expect.fail();
    });
    const updateDateOne = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      postId: (await resultOne).id,
      updateField: 'content',
      updateContext: 'This is test update content',
    };
    updatePostFunc(updateDateOne);
    const readData = {
      postId: updateDateOne.postId,
    };
    const myResult = readPost(readData);
    if (myResult === undefined) {
      expect.fail();
    }
  });

  it('add Test with no title and no content', async () => {
    const resultFour = addPostFunc(testDataFour);
    resultFour.then(() => {
      // console.log(result);
      expect.fail();
    }).catch(() => {
      // Doing Nothing it should raise error
      console.log('raise error here');
    });
  });

  it('add Test with no title and content', async () => {
    const resultTwo = addPostFunc(testDataTwo);
    resultTwo.then(() => {
      // console.log(result);
    }).catch(() => {
      expect.fail();
    });
  });

  it('add Test with title and no content with update content', async () => {
    const resultThree = addPostFunc(testDataThree);
    resultThree.then(() => {
      // console.log(result);
    }).catch(() => {
      expect.fail();
    });
  });

  // it('update Post Test ', async () => {
  //   updatePostFunc(updateDateOne);
  // });
});
