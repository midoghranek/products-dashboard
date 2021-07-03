import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getDataFromFirestoreCollection(collectionName: string) {
  const getProducts = await getDocs(collection(db, collectionName));
  const newProducts: unknown[] = [];
  getProducts.forEach((doc) => {
    newProducts.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return newProducts;
}

export function captalizeFirstLetter(string: string): string {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function firebaseAuthErrorHandler(code: string): string {
  const fineCode = code.replace("auth/", "").replaceAll("-", " ");
  return captalizeFirstLetter(fineCode);
}
