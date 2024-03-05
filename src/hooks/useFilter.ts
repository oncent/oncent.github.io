import type { BillCategory, BillType } from "@/data/bill";
import { BillCategories } from "@/data/category";
import dayjs, { type Dayjs } from "dayjs";
import { useUser, type User } from "./useUser";
import { useLimitedMultiSelect } from "./useLimitSelect";

export type FilterProp = {
    start?: Dayjs | string;
    end?: Dayjs | string;
    max?: number;
    min?: number;
    type?: BillType;
    users: string[];
    categories: string[];
};
export const useFilterForm = (props?: FilterProp) => {
    const start = ref(props?.start ? dayjs(props?.start) : dayjs.unix(-Infinity));
    const end = ref(props?.end ? dayjs(props?.end) : dayjs.unix(Infinity));

    const min = ref(props?.min ?? -Infinity);
    const max = ref(props?.max ?? Infinity);

    const type = ref<BillType | undefined>(props?.type);

    const { allUsers } = useUser();
    const selectedUsers = ref<User[]>(props?.users?.map(u => allUsers.value.find(l => l.id === u)).filter(Boolean) as User[] ?? []);
    useLimitedMultiSelect(selectedUsers, allUsers);

    const selectedCategories = ref<BillCategory[]>(props?.categories?.map(c => BillCategories.find(e => e.id === c)!) ?? []);
    const billCategories = computed(() =>
        BillCategories.filter(
            (item) => type.value === undefined || item.type === type.value
        )
    );
    useLimitedMultiSelect(selectedCategories, billCategories);
    watch(type, () => {
        selectedCategories.value = [...billCategories.value];
    });

    const reset = () => {
        start.value = dayjs.unix(-Infinity);
        end.value = dayjs.unix(Infinity);
        min.value = -Infinity;
        max.value = Infinity;
        type.value = undefined;
        selectedUsers.value = allUsers.value;
        selectedCategories.value = [...billCategories.value];
      };

      const   getFilter= () => ({
        start: start.value?.isValid() ? start.value : undefined,
        end: end.value?.isValid() ? end.value : undefined,
        max: max.value,
        min: min.value,
        type: type.value,
        users: selectedUsers.value.map((u) => u.id),
        categories: selectedCategories.value.map((c) => c.id),
      })

      const setFilter =(f:FilterProp)=>{
        start.value=f?.start ? dayjs(f?.start) : dayjs.unix(-Infinity)
        end.value=f?.end ? dayjs(f?.end) : dayjs.unix(Infinity)
        max.value=f?.max ?? Infinity
        min.value=f?.min ?? -Infinity
        type.value=f.type
        selectedUsers.value=f?.users?.map(u => allUsers.value.find(l => l.id === u)).filter(Boolean) as User[] ?? []
        selectedCategories.value=f?.categories?.map(c => BillCategories.find(e => e.id === c)!) ?? []
      }

    return {
        start,
        end,
        min,
        max,
        type,
        selectedUsers,
        selectedCategories,

        allUsers,
        billCategories,

        reset,
        getFilter,
        setFilter
    }
}