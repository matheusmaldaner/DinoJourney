import { getItemAsync, setItemAsync } from "expo-secure-store";

const USER_NAME_STORE = "userName";

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
