import { db } from "@/services/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type EcoBadgeType = "Eco Shopper" | "Plastic-Free Purchaser" | "Organic Advocate" | "Green Reviewer";

export interface UserBadges {
  badges: EcoBadgeType[];
}

export async function getUserBadges(uid: string): Promise<UserBadges> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const data = snap.data();
  return { badges: (data?.badges || []) as EcoBadgeType[] };
}

export async function addBadgeToUser(uid: string, badge: EcoBadgeType) {
  const { badges } = await getUserBadges(uid);
  if (!badges.includes(badge)) {
    await setDoc(doc(db, "users", uid), { badges: [...badges, badge] }, { merge: true });
  }
}

// Example logic to award badges based on actions
export function getBadgeForAction(action: string): EcoBadgeType | null {
  switch (action) {
    case "purchase":
      return "Eco Shopper";
    case "plastic_free_purchase":
      return "Plastic-Free Purchaser";
    case "organic_purchase":
      return "Organic Advocate";
    case "review":
      return "Green Reviewer";
    default:
      return null;
  }
}
