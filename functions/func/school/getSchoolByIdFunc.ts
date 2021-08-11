import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @YH
I would recommend store docId for users' school.
This function returns the raw school object by a docID.
Inputs {
    refId: the ID of user's school
}
Output {
    the school doc
}
 */

export const getSchoolById = async (data:{
  docID : string;
}) => db.collection('School').doc(data.docID);

export default functions.https.onCall(getSchoolById);
