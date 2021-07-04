import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "@firebase/firestore";
import { FormInputs, ProductData } from "@local/types";
import { auth, db, getDataFromFirestoreCollection } from "@local/utils";

export const addProduct = (data: FormInputs) => {
  return addDoc(collection(db, "products"), {
    user: auth?.currentUser?.email,
    ...data,
  });
};

export const editProduct = (
  id: string,
  prevData: ProductData,
  newData: FormInputs
) => {
  return setDoc(doc(db, "products", id), {
    ...prevData,
    ...newData,
  });
};

export const deleteProduct = (id: string) => {
  return deleteDoc(doc(db, "products", id));
};

export const getProducts = () => {
  return getDataFromFirestoreCollection("products");
};
