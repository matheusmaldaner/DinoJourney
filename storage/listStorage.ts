import { getItem, setItem, setItemAsync } from "expo-secure-store";

export const INTERESTS_LIST_NAME = "Interests";
export const GOALS_LIST_NAME = "Goals";
export const ACCOMPLISHMENTS_LIST_NAME = "Accomplishments";
export const STRUGGLES_LIST_NAME = "Struggles";

export const STORAGE_LISTS = [
  INTERESTS_LIST_NAME,
  GOALS_LIST_NAME,
  ACCOMPLISHMENTS_LIST_NAME,
  STRUGGLES_LIST_NAME,
];

export async function getList(listName: string): Promise<string[]> {
  const list = getItem(listName);
  return list ? JSON.parse(list) : [];
}

export async function saveList(listName: string, list: string[]): Promise<void> {
  return setItemAsync(listName, JSON.stringify(list));
}
