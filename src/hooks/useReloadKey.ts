import { uniqueId } from "@/utils/unique"

export const useReloadKey = () => {
    const key = ref(`comp_${uniqueId()}`);
    const reload = () => {
        key.value = `comp_${uniqueId()}`;
    }
    return {
        key,
        reload
    }
}