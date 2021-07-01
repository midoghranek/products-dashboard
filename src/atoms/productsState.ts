import { ProductData } from "@local/types";
import { atom } from "recoil";

export const productListState = atom<readonly ProductData[]>({
  key: "productListState",
  default: [],
});
