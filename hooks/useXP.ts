import { getUserXP, setUserXP } from "@/storage/userData";
import { $userXP } from "@/stores/xpStore";
import { useStore } from "@nanostores/react";

export function useXP() {
  const xp = useStore($userXP);
  if (xp == -1) {
    getUserXP().then((xp) => $userXP.set(xp));
  }
  return xp;
}

export function updateXP(xp: number) {
  $userXP.set(xp);
  setUserXP(xp);
}
