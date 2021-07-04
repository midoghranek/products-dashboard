import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "@firebase/firestore";
import { FormInputs } from "@local/types";
import { auth, db, getDataFromFirestoreCollection } from "@local/utils";

export const addProduct = (data: FormInputs) => {
  return addDoc(collection(db, "products"), {
    user: auth?.currentUser?.email,
    ...data,
  });
};

export const editProduct = (id: string, data: FormInputs) => {
  return setDoc(doc(db, "products", id), {
    ...data,
  });
};

export const deleteProduct = (id: string) => {
  return deleteDoc(doc(db, "products", id));
};

export const getProducts = () => {
  return getDataFromFirestoreCollection("products");
};
