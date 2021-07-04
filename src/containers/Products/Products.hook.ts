import { useProductsData } from "@local/hooks";
import { editProductModalState } from "@local/states";
import { ProductData } from "@local/types";
import { useSetRecoilState } from "recoil";
import { deleteProduct as deleteProductService } from "@local/services";
export const useProducts = () => {
  const { products, updateProducts } = useProductsData();

  const deleteProduct = (docId: string) => {
    deleteProductService(docId)
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
