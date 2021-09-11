import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';

/*
This is oncall  function for read user profile written by Jerry;
input:
    data = { uid }
output:
    userDoc.data(): promise<firebasefirestore.documentdata | undefined >
*/
export const isEmailVerified = async (data:{
  uid: string;
}) => {
  const { uid } = data;// get the value
  if (uid == null) {
    return false;
  }
  if (!isUserExists({ uid })) {
    return false;
  }

  const collection = 'user';
  const collectionRef = db.collection(collection).doc(uid);
  const collectionDoc = await collectionRef.get();
  const collectionData = collectionDoc.data();
  if (collectionData === undefined) {
    return false;
  }
  return collectionData.emailVerified;
};

export default isEmailVerified;
