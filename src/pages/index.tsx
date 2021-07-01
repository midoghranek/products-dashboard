import { useDidMount } from "@ghranek/hooks";
import { auth, getDataFromFirestoreCollection } from "@local/utils";
import { Fab, CircularProgress } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { ProductData } from "@local/types";
import { Products, Appbar, NewProduct } from "@local/containers";
import { useSetRecoilState } from "recoil";
import { newProductModalState, productListState } from "@local/atoms";

export default function Home() {
  const router = useRouter();
  const setProducts = useSetRecoilState(productListState);

  const updateProducts = () => {
    getDataFromFirestoreCollection("products").then((data) =>
      setProducts(data as ProductData[])
    );
  };

  useDidMount(() => {
    if (!auth.currentUser) router.push("/login");
    console.log({ user: auth.currentUser });
    updateProducts();
  });

  const setAddProductsModalOpen =
    useSetRecoilState<boolean>(newProductModalState);

  const handleAddProductsModal = () => {
    setAddProductsModalOpen((state) => !state);
  };

  if (auth.currentUser)
    return (
      <div style={{ flexGrow: 1 }}>
        <Appbar />
        <Products />
        <FloatingButton color="primary" onClick={handleAddProductsModal}>
          <AddIcon />
        </FloatingButton>
        <NewProduct />
      </div>
    );

  return (
    <Center>
      <CircularProgress />
    </Center>
  );
}

const Center = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

const FloatingButton = styled(Fab)`
  && {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
`;
