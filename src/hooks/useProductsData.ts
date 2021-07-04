import { getProducts } from "@local/services";
import { productListState } from "@local/states";
import { ProductData } from "@local/types";
import { useRecoilState } from "recoil";

const useProductsData = () => {
  const [products, setProducts] = useRecoilState(productListState);
  const updateProducts = () => {
    getProducts().then((data) => setProducts(data as ProductData[]));
  };
  return { products, updateProducts };
};

export default useProductsData;
