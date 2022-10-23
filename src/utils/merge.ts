// 从大到小排序
export const mergeSortableArrays = <T>(arrs: T[][], sortBy: keyof T): T[] => {
  let ret: T[] = [];
  let indexArr = arrs.map((_, index) => {
    return {
      index,
      count: 0,
    };
  });
  //记录每一个数组循环比较时的下标变化
  const filterIndexArr = () => {
    indexArr = indexArr.filter((item) => item.count < arrs[item.index].length);
  };

  type Flag = { index: number; val: number; raw: T };
  //将每次比较的元素放进一个临时数组里面，取出最小值放入ret
  const pushToArr = (arr: Flag[]) => {
    let min = arr[0];
    let increaseArr = [arr[0].index];
    arr.forEach((item, index) => {
      if (min.val < item.val) {
        min = item;
        increaseArr = [item.index];
      } else if (min.val == item.val && index != 0) {
        increaseArr.push(item.index);
      }
    });
    increaseArr.forEach((item) => {
      const thatItem = item;
      indexArr.forEach((item) => {
        if (item.index == thatItem) {
          item.count++;
        }
      });
    });
    filterIndexArr();
    ret.push(min.raw);
  };

  filterIndexArr();

  let compareArr: Flag[] = [];
  while (indexArr.length > 1) {
    //循环比较每个数组的第一个元素
    compareArr = indexArr.map((item, index) => {
      return {
        index: item.index,
        val: arrs[item.index][item.count][sortBy] as number,
        raw: arrs[item.index][item.count],
      };
    });
    pushToArr(compareArr);
  }
  if (!indexArr[0]) return ret;
  //取出最后不需要比较的数组元素，直接拼接到ret后面
  const remainArr = arrs[indexArr[0].index].slice(indexArr[0].count);
  ret = ret.concat(remainArr);
  return ret;
};
