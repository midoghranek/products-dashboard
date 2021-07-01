import { productListState } from "@local/atoms";
import { ProductData } from "@local/types";
import { db, getDataFromFirestoreCollection } from "@local/utils";
import { doc, deleteDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";

export const useProducts = () => {
  const [products, setProducts] = useRecoilState(productListState);

  const updateProducts = () => {
    getDataFromFirestoreCollection("products").then((data) =>
      setProducts(data as ProductData[])
    );
  };

  const deleteProduct = (docId: string) => {
    deleteDoc(doc(db, "products", docId))
      .then(() => updateProducts())
      .catch((err) => console.error(err));
  };
  return { products, deleteProduct };
};
