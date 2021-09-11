import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';

export const isPhoneVerified = async (data:{
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
  const userRef = db.collection(collection).doc(uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  if (userData === undefined) {
    return false;
  }
  return userData.phoneNumberVerified;
};

export default isPhoneVerified;
