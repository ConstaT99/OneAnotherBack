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
  return ['娱乐', '学习', '时尚', '生活', '兴趣', '其它'].includes(data.name);
};
export default functions.https.onCall(isCatExists);
