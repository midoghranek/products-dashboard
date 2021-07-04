import { useDidMount } from "@ghranek/hooks";
import { auth } from "@local/utils";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Products,
  Appbar,
  NewProduct,
  EditProduct,
  FloatingButton,
} from "@local/containers";
import Head from "next/head";
import { NoSSR } from "@local/components";
import { useProductsData } from "@local/hooks";

export default function Home() {
  const router = useRouter();
  const { updateProducts } = useProductsData();

  useDidMount(() => {
    if (!auth.currentUser) router.push("/login");
    updateProducts();
  });

  if (auth.currentUser)
    return (
      <Container>
        <Head>
          <title>Products Dashboard</title>
        </Head>
        <Appbar />
        <Products />
        <FloatingButton />
        <NewProduct />
        <EditProduct />
      </Container>
    );

  return (
    <NoSSR>
      <Center>
        <CircularProgress />
      </Center>
    </NoSSR>
  );
}

const Container = styled.div`
  flex-grow: 1;
  position: relative;
  min-height: 100vh;
`;

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
