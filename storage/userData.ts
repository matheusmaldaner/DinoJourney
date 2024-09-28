import { getItemAsync, setItemAsync } from "expo-secure-store";

const USER_NAME_STORE = "userName";

export const getUsersName = async () => {
  return getItemAsync(USER_NAME_STORE);
};

export const setName = async (name: string) => {
  return setItemAsync(USER_NAME_STORE, name);
};
