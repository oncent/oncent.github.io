import { db } from "@/data/db";
import { createCancelablePromise } from "@/utils/cancelablePromise";
import { downloadBlob } from "@/utils/download";
import { useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";
import { exportDB, importDB, importInto } from "dexie-export-import";

export const lastBackupedTime = useLocalStorage("lastBackupTime", -1);

export const useBackupExport = () => {
  const progress = ref(0);
  const { start, cancel } = createCancelablePromise(async (onCancel) => {
    let isCanceled = false;
    onCancel(() => {
      isCanceled = true;
      progress.value = 0;
    });
    progress.value = 0;
    const data = await exportDB(db, {
      progressCallback: (p) => {
        if (isCanceled) return false;
        if (!p.totalRows) return true;
        progress.value = p.completedRows / p.totalRows;
        return true;
      },
    });
    lastBackupedTime.value = dayjs().unix();
    downloadBlob(
      `oncent-backup-${dayjs().format("YYYY-MM-DD HH:mm:ss")}.json`,
      data
    );
  });
  return {
    start,
    cancel,
    progress,
  };
};

export const useBackupImport = () => {
  const progress = ref(0);
  const { start, cancel } = createCancelablePromise(
    async (onCancel, file: File) => {
      let isCanceled = false;
      onCancel(() => {
        isCanceled = true;
        progress.value = 0;
      });
      progress.value = 0;
      await importInto(db, file, {
        acceptVersionDiff: true,
        acceptMissingTables: true,
        acceptChangedPrimaryKey: true,
        clearTablesBeforeImport: true,
        acceptNameDiff: false,
        overwriteValues: true,
        progressCallback: (p) => {
          if (isCanceled) return false;
          if (!p.totalRows) return true;
          progress.value = p.completedRows / p.totalRows;
          return true;
        },
      });
    }
  );
  return {
    start,
    cancel,
    progress,
  };
};
