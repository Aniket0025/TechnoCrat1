import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/services/firebase";

export const db = getFirestore(app);

export async function createUserProfile<T extends Record<string, unknown>>(uid: string, data: T) {
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

// Cart sync helpers
export async function getUserWishlist(uid: string) {
  const userDoc = await getDoc(doc(db, "users", uid));
  const data = userDoc.data();
  return (data && data.wishlist) ? data.wishlist : [];
}

export async function setUserWishlist(uid: string, items: any[]) {
  await setDoc(doc(db, "users", uid), { wishlist: items }, { merge: true });
}
