import { $userLevel } from "@/stores/levelStore";
import { getUserLevel, getUserXP, setUserLevel, setUserXP } from "../storage/userData";
import { $userXP } from "@/stores/xpStore";

export async function requiredXPForLevelUp(): Promise<number> {
  const level = await getUserLevel();
  return level * 100;
}

/**
 *
 * @param amount The amount of XP to increase by
 * @returns true if the user leveled up, false otherwise
 */
export async function increaseXP(amount: number): Promise<boolean> {
  const xp = await getUserXP();
  const newXP = xp + amount;
  const requiredXP = await requiredXPForLevelUp();
  if (newXP >= requiredXP) {
    const level = await getUserLevel();
    await setUserLevel(level + 1);
    await setUserXP(newXP - requiredXP);
    $userLevel.set(level + 1);
    $userXP.set(newXP - requiredXP);
    return true;
  } else {
    await setUserXP(newXP);
    $userXP.set(newXP);
    return false;
  }
}
