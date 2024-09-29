import { deleteItemAsync, getItem, getItemAsync, setItem, setItemAsync } from "expo-secure-store";

const USER_NAME_STORE = "userName";
const USER_XP_STORE = "userXP";
const USER_LEVEL_STORE = "userLevel";

const ALL_STORES = [USER_NAME_STORE, USER_XP_STORE, USER_LEVEL_STORE];

export const getUsersName = async () => {
  const name = getItemAsync(USER_NAME_STORE);
  if (name == null) {
    return "Nick";
  }
  return name;
};

export const setName = async (name: string) => {
  return setItemAsync(USER_NAME_STORE, name);
};

export const getUserXP = async (): Promise<number> => {
  const xp = getItem(USER_XP_STORE);
  if (xp == null) {
    return 0;
  }
  return parseInt(xp);
};

export const setUserXP = async (xp: number) => {
  return setItem(USER_XP_STORE, xp.toString());
};

export const getUserLevel = async (): Promise<number> => {
  const level = getItem(USER_LEVEL_STORE);
  if (level == null) {
    return 1;
  }
  return parseInt(level);
};

export const setUserLevel = async (level: number) => {
  return setItem(USER_LEVEL_STORE, level.toString());
};

export const clearUserData = async () => {
  return ALL_STORES.forEach(async (store) => deleteItemAsync(store));
};
