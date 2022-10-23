import { db } from "@/data/db";
import { liveQuery } from "dexie";
import { v4 } from "uuid";
import { useAsyncComputed } from "./useAsyncComputed";

export type User = {
  name: string;
  id: string;
  nickname?: string;
  connectId: string;
  me: boolean;
  latestTransferTime: number;
  trust?: boolean;
};

const createInitialUser = (): User => {
  return {
    id: v4(),
    name: "Me",
    me: true,
    connectId: "",
    latestTransferTime: -1,
  };
};

const { result: userInfo, directlyChange } = useAsyncComputed(
  async (v) => {
    await db.users.put({ ...v }, v.id);
    return v;
  },
  {
    name: "",
    id: "",
    me: false,
    connectId: "",
    latestTransferTime: -1,
  }
);

let isCreatingMe = false;
const init = async () => {
  const v = await db.users.toArray();
  if (v.length === 0 && !isCreatingMe) {
    isCreatingMe = true;
    const newUser = createInitialUser();
    await db.users.add({
      ...newUser,
      me: true,
    });
    isCreatingMe = false;
    directlyChange(newUser);
    return v;
  }
  directlyChange(v.find((u) => u.me)!);
  return v;
};
init();

const allUsers = ref<User[]>([]);
liveQuery(async () => {
  return await init();
}).subscribe((v) => {
  allUsers.value = v;
});

const setMyInfo = (info: Partial<Omit<User, "me" | "id">>) =>
  db.users.update(userInfo.value.id, { ...userInfo.value, ...info });

const updateUserInfo = async (
  id: string,
  info: Partial<Omit<User, "me" | "id">>
) => {
  const oldInfo = await db.users.get(id);
  return db.users.update(id, { ...oldInfo, ...info });
};

const addUserInfo = (info: Omit<User, "me" | "id"> & { id?: string }) => {
  return db.users.add({ ...info, id: info.id ?? v4(), me: false });
};

const removeUserInfo = async (id: string) => {
  await db.users.delete(id);
  await db.deleteBillTable(id);
};

export const useUser = () => {
  return {
    userInfo,
    allUsers,
    setMyInfo,
    updateUserInfo,
    addUserInfo,
    removeUserInfo,
  };
};

export const getUserName = (uid: string) => {
  return allUsers.value.find((u) => u.id === uid);
};
