const countDecimals = (_num: number | string) => {
  let len = 0;
  try {
    const num = Number(_num);
    let str = num.toString().toUpperCase();
    if (str.split("E").length === 2) {
      // scientific notation
      var isDecimal = false;
      if (str.split(".").length === 2) {
        str = str.split(".")[1];
        if (parseInt(str.split("E")[0]) !== 0) {
          isDecimal = true;
        }
      }
      let x = str.split("E");
      if (isDecimal) {
        len = x[0].length;
      }
      len -= parseInt(x[1]);
    } else if (str.split(".").length === 2) {
      // decimal
      if (parseInt(str.split(".")[1]) !== 0) {
        len = str.split(".")[1].length;
      }
    }
  } catch (e) {
    throw e;
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0;
    }
    return len;
  }
};

const convertToInt = (_num: number | string) => {
  let newNum = Number(_num);
  let times = countDecimals(_num);
  let temp_num = _num.toString().toUpperCase();
  if (temp_num.split("E").length === 2) {
    newNum = Math.round(newNum * Math.pow(10, times));
  } else {
    newNum = Number(temp_num.replace(".", ""));
  }
  return newNum;
};

const getCorrectResult = (
  type: string,
  num1: number,
  num2: number,
  result: number
) => {
  let temp_result = 0;
  switch (type) {
    case "add":
      temp_result = num1 + num2;
      break;
    case "sub":
      temp_result = num1 - num2;
      break;
    case "div":
      temp_result = num1 / num2;
      break;
    case "mul":
      temp_result = num1 * num2;
      break;
  }
  if (Math.abs(result - temp_result) > 1) {
    return temp_result;
  }
  return result;
};

const accMul = (_num1: number, _num2: number) => {
  const num1 = Number(_num1);
  const num2 = Number(_num2);
  var times = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  try {
    times += countDecimals(s1);
  } catch (e) {}
  try {
    times += countDecimals(s2);
  } catch (e) {}
  var result = (convertToInt(s1) * convertToInt(s2)) / Math.pow(10, times);
  return getCorrectResult("mul", num1, num2, result);
  // return result;
};

export const accAdd = (_num1: number, _num2: number) => {
  const num1 = Number(_num1);
  const num2 = Number(_num2);
  let dec1: number, dec2: number, times: number;
  try {
    dec1 = countDecimals(num1) + 1;
  } catch (e) {
    dec1 = 0;
  }
  try {
    dec2 = countDecimals(num2) + 1;
  } catch (e) {
    dec2 = 0;
  }
  times = Math.pow(10, Math.max(dec1, dec2));
  // var result = (num1 * times + num2 * times) / times;
  var result = (accMul(num1, times) + accMul(num2, times)) / times;
  return getCorrectResult("add", num1, num2, result);
  // return result;
};
