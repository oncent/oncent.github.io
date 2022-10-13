import type { UnwrapRef } from "vue";

export enum MutationStatus {
  mutating,
  success,
  fail,
}

export const useAsyncComputed = <T>(
  set: (v: UnwrapRef<T>) => Promise<T>,
  initial: T
) => {
  const _v = ref<T>(initial);
  const status = ref(MutationStatus.success);
  return {
    result: computed({
      get: () => _v.value,
      set: async (v) => {
        status.value = MutationStatus.mutating;
        try {
          const r = await set(v);
          _v.value = r as UnwrapRef<T>;
        } catch (error) {
          console.error(error);
          status.value = MutationStatus.fail;
        }
      },
    }),
    status,
    directlyChange: (v: UnwrapRef<T>) => {
      _v.value = v;
    },
  };
};
