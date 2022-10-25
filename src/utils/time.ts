import { currentLanguage, t } from "@/locale";
import dayjs, { type Dayjs } from "dayjs";

export const denseTime = (time: Dayjs) => {
    const now = dayjs()
    if (time.isSame(now, 'days')) {
        return t('Today')
    }
    const dayDiff = time.diff(now, 'month')
    if (dayDiff <= 3) {
        if (currentLanguage.value?.id === 'zh') return `${time.format("DD")}日`
        return time.format("MM-DD")
    }
    if (!time.isSame(now, 'month')) {
        return time.format("MM-DD")
    }
    return time.format("YYYY-MM-DD")
}