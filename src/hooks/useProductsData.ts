import { productListState } from "@local/states";
import { ProductData } from "@local/types";
import { getDataFromFirestoreCollection } from "@local/utils";
import { useRecoilState } from "recoil";

const useProductsData = () => {
  const [products, setProducts] = useRecoilState(productListState);
  const updateProducts = () => {
    getDataFromFirestoreCollection("products").then((data) =>
      setProducts(data as ProductData[])
    );
  };
  return { products, updateProducts };
};

export default useProductsData;
