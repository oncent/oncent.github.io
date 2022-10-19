// 通过触发点击或者其他用户事件来允许iOS safari允许autofocus，此函数需要在点击事件内触发，且必须与事件同步执行
export const requestAutofocus = () => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.focus();
  input.style.display = "none";
  setTimeout(() => {
    input.remove();
  }, 1000);
};

export const getFocusElement = () => {
  return document.querySelector(":focus");
};
