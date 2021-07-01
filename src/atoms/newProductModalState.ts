import { atom } from "recoil";

export const newProductModalState = atom<boolean>({
  key: "newProductModalState",
  default: false,
});
