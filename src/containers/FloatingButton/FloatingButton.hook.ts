import { newProductModalState } from "@local/states";
import { useSetRecoilState } from "recoil";

export const useFloatingButton = () => {
  const setAddProductsModalOpen =
    useSetRecoilState<boolean>(newProductModalState);

  const handleAddProductsModal = () => {
    setAddProductsModalOpen((state) => !state);
  };
  return { handleAddProductsModal };
};
