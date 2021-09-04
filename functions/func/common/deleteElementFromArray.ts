export function arrayRemove(myArray:Array<any>, element:any) {
  const index = myArray.indexOf(element);
  if (index > -1) {
    myArray.splice(index, 1);
  }
  return myArray;
}

export default arrayRemove;
