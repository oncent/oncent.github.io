type NumpadNumberInput = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

type NumpadStringInput = "." | "+" | "-";

export type NumpadInput = NumpadNumberInput | NumpadStringInput;

export type NumpadResult = {
  value: number;
  text: string;
};

export const createNumpadController = (initValue?: number) => {
  let arr: {
    type: "float" | "int" | "arith";
    value: (string | number)[];
  }[] = [];
  const input = (n: NumpadInput) => {
    const last = arr.at(-1);

    if (typeof n === "number") {
      if (last === undefined) {
        arr.push({ type: "int", value: [n] });
        return;
      }
      if (last.type === "int") {
        if (last.value.length === 1 && last.value[0] === 0) {
          arr[arr.length - 1] = {
            type: "int",
            value: [n],
          };
          return;
        }
        arr[arr.length - 1] = {
          type: "int",
          value: [...last.value, n],
        };
        return;
      }
      if (last.type === "float") {
        arr[arr.length - 1] = {
          type: "float",
          value: [...last.value, n],
        };
        return;
      }
      if (last.type === "arith") {
        arr.push({
          type: "int",
          value: [n],
        });
        return;
      }
      return;
    }
    if (n === ".") {
      if (last === undefined) {
        arr.push({
          type: "float",
          value: [0, "."],
        });
        return;
      }
      if (last.type === "int") {
        arr[arr.length - 1] = {
          type: "float",
          value: [...last.value, "."],
        };
        return;
      }
      if (last.type === "arith") {
        arr.push({
          type: "float",
          value: [0, "."],
        });
        return;
      }
      if (last.type === "float") {
        return;
      }
    }
    arr.push({
      type: "arith",
      value: [n],
    });
  };

  const remove = (index?: number) => {
    console.log(index);
    const currentResult = result();
    const removeIndex = index ?? currentResult.text.length - 1;
    const inputArr = currentResult.text
      .split("")
      .filter((_, i) => i !== removeIndex);
    arr = [];
    inputArr.forEach((x) => {
      if ([".", "+", "-"].includes(x)) {
        input(x as NumpadInput);
      } else {
        input(Number(x) as NumpadNumberInput);
      }
    });
    console.log(arr);
  };

  const add = (a: number, b: number) => a + b;
  const minus = (a: number, b: number) => a - b;

  const result = (): NumpadResult => {
    const value = arr.reduce(
      (p, c) => {
        if (c.type === "arith") {
          return {
            ...p,
            calc: c.value[0] === "+" ? add : minus,
            text: `${p.text}${c.value.join("")}`,
          };
        }
        return {
          ...p,
          lastValue: p.calc(p.lastValue, Number(c.value.join(""))),
          text: `${p.text}${c.value.join("")}`,
        };
      },
      { lastValue: 0, calc: add, text: "" }
    );
    return {
      value: value.lastValue,
      text: value.text,
    };
  };

  if (initValue !== undefined) {
    arr = [
      {
        type: Number.isInteger(initValue) ? "int" : "float",
        value: initValue.toString().split(""),
      },
    ];
  }

  return {
    input,
    result,
    remove,
  };
};
