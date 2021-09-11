import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';

export const isUidCorrect = async (data:{
  uid: string;
  collection: string;
  docId: string;
}) => {
  const { uid, collection, docId } = data;// get the value
  if (uid == null) {
    return false;
  }
  if (!isUserExists({ uid })) {
    return false;
  }
  const collectionRef = db.collection(collection).doc(docId);
  const collectionDoc = await collectionRef.get();
  const collectionData = collectionDoc.data();
  if (collectionData === undefined) {
    return false;
  }
  const collectionUid = collectionData.uid;
  if (uid !== collectionUid) {
    return false;
  }
  return true;
};

export default isUidCorrect;
