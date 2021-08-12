import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { db } from '../../db';

/*
Author @YH
Retrieve downloadable link for school avatar by name
Inputs {
    name: school's name
}
Output {
    a downloadable link or an error if school name DNE
}
 */

export const getAvatarByName = async (data:{
  name : string;
}) => {
  const schoolCollection = db.collection('school');
  schoolCollection.where('schoolName', '==', data.name)
    .get()
    .then((querySnapshot) => {
      console.log('querying');
      querySnapshot.forEach((doc) => {
        firebase.storage().refFromURL(doc.get('avatar')).getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .catch((error) => {
            console.log('oops1')
            return error;
          });
      });
    })
    .catch((error) => {
      console.log('oops2');
      return error;
    });
};

export default functions.https.onCall(getAvatarByName);
