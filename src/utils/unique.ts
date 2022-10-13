export const uniqueId = (() => {
  let i = 0;
  return () => (i += 1);
})();
