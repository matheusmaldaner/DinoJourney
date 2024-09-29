import { getUserLevel, setUserLevel } from "@/storage/userData";
import { $userLevel } from "@/stores/levelStore";
import { useStore } from "@nanostores/react";

export function useLevel() {
  const level = useStore($userLevel);
  if (level == -1) {
    getUserLevel().then((level) => $userLevel.set(level));
  }
  return level;
}

export function updateLevel(level: number) {
  $userLevel.set(level);
  setUserLevel(level);
}
