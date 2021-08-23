import 'mocha';
import { expect } from 'chai';
import { addTagFunc } from '../../func/tag/addTagFunc'
import { db } from '../../db';


describe('addTagFunction test', () => {
    it('the result should be true if the Tag is successfully created', async () => {
        const testData = {
            name: 'NewAddedTag',
            postId: 'wR9n7Q6vF5i1kaep0tuq',
        };
        const returnID = await addTagFunc(testData);
        const tagRef = db.collection('tag');
        const docRef = await tagRef.doc(returnID).get();
        //@ts-ignore
        expect(docRef.data().name).to.equal('NewAddedTag');
        //@ts-ignore
        expect(docRef.data().posts).contain('wR9n7Q6vF5i1kaep0tuq');
        db.collection('tag').doc(returnID).delete();
    });
    it('the result should not be created if the name are the same', async () => {
        const testData = {
            name: '香槟美食',
            postId: 'abcdefg',
        };
        const returnID = await addTagFunc(testData);
        const tagRef = db.collection('tag');
        const docRef = await tagRef.doc(returnID).get();
        //@ts-ignore
        expect(docRef.data().posts).contain('abcdefg'); 
        db.collection('tag').doc(returnID).delete();
    });
});