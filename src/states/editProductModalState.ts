import { EditProductModal, ProductData } from "@local/types";
import { atom } from "recoil";

export const editProductModalState = atom<EditProductModal>({
  key: "editProductModalState",
  default: {
    open: false,
    product: null,
  },
});
