import { clearAllLists } from "@/storage/listStorage";
import { clearUserData } from "@/storage/userData";

export async function clearAllData() {
  console.log("Clearing all data");
  console.log("Clearing user data");
  await clearUserData();
  console.log("User data cleared");
  console.log("Clearing lists of Shelly memory data");
  await clearAllLists();
  console.log("Lists of Shelly memory data cleared");
  console.log("All data cleared");
}
