type Filter<T> = (item: T) => boolean;
export const multiFiltered = <T>(arr: T[], filters: Filter<T>[]) => {
  const results = Array.from(filters, () => [] as T[]);
  arr.forEach((item) => {
    filters.forEach((filter, i) => {
      if (filter(item)) {
        results[i].push(item);
      }
    });
  });
  return results;
};
