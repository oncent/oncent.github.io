const CANCEL_MSG = "promise canceled";

type OmitFirst<T extends any[]> = T extends [f: any, ...args: infer P]
  ? P
  : never;

export const createCancelablePromise = <
  T extends (onCancel: (f: () => void) => void, ...args: any[]) => Promise<any>
>(
  callback: T
) => {
  let abort: (v?: any) => void = () => undefined;

  let cancelFn: () => any = () => undefined;
  const onCancel = (f: () => any) => {
    cancelFn = f;
  };
  const start = (...p: OmitFirst<Parameters<T>>) => {
    const mainPromise = callback(onCancel, ...p) as ReturnType<T>;
    const abortPromise = new Promise((_, rej) => {
      abort = rej;
    }) as ReturnType<T>;
    const finalPromise = Promise.race([mainPromise, abortPromise]);
    return finalPromise;
  };
  const cancel = () => {
    abort(new Error(CANCEL_MSG));
    cancelFn();
  };
  return {
    start,
    cancel,
  };
};

export const isCancelError = (error: any) => error?.message === CANCEL_MSG;
