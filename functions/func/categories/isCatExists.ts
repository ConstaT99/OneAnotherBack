import * as functions from 'firebase-functions';
/*
Author @Carstin
check if the cat name exists in current dab design.
Input{
    name: the name of the cat I wanna check
}
Output{
    true: eixsts
    false: not exists
}
*/
export const isCatExists = async (data:{
  name: string;
}) => {
  const {name} = data;
  if (name === '娱乐' || name === '学习' || name === '时尚' || name === '生活' || name === '兴趣' ||name === '其它') {
    return true;
  } else {
    return false;
  }
}
export default functions.https.onCall(isCatExists);