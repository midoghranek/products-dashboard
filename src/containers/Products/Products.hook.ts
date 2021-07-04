import { useProductsData } from "@local/hooks";
import { editProductModalState } from "@local/states";
import { ProductData } from "@local/types";
import { db } from "@local/utils";
import { doc, deleteDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

export const useProducts = () => {
  const { products, updateProducts } = useProductsData();

  const deleteProduct = (docId: string) => {
    deleteDoc(doc(db, "products", docId))
      .then(() => updateProducts())
      .catch((err) => console.error(err));
  };

  const setEditProductModal = useSetRecoilState(editProductModalState);
  const openEditProductModal = (product: ProductData) => {
    setEditProductModal({
      open: true,
      product,
    });
  };

  return { products, deleteProduct, openEditProductModal };
};
