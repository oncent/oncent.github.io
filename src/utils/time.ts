import { currentLanguage, t } from "@/locale";
import dayjs, { type Dayjs } from "dayjs";

export const denseTime = (time: Dayjs) => {
    const now = dayjs()
    if (time.isSame(now, 'days')) {
        return t('Today')
    }
    const dayDiff = time.diff(now, 'day')
    if (dayDiff <= 3 && dayDiff>=0) {
        if (currentLanguage.value?.id === 'zh') return `${time.format("DD")}日`
        return time.format("MM-DD")
    }
    if (time.isSame(now, 'year')) {
        return time.format("MM-DD")
    }
    return time.format("YYYY-MM-DD")
}