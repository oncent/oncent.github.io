import { db } from "@/data/db";
import { liveQuery } from "dexie";
import { v4 } from "uuid";
import { useAsyncComputed } from "./useAsyncComputed";

export type User = {
  name: string;
  id: string;
  nickname?: string;
};

const createInitialUser = (): User => {
  return {
    id: v4(),
    name: "Me",
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
  directlyChange(v[0]);
  return v;
};
init();

const allUsers = ref<User[]>([]);
liveQuery(async () => {
  return await init();
}).subscribe((v) => {
  allUsers.value = v;
});

export const useUser = () => {
  return {
    userInfo,
    allUsers,
  };
};

export const getUserName = (uid: string) => {
  return allUsers.value.find((u) => u.id === uid);
};
