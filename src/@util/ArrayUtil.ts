export const remove = (array: any[], value: any) => {
  return array.filter(function (ele) {
    return ele != value;
  });
};
