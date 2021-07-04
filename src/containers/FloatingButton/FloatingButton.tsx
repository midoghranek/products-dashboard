import styled from "@emotion/styled";
import { newProductModalState } from "@local/states";
import { Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useSetRecoilState } from "recoil";

const FloatingButton = () => {
  const setAddProductsModalOpen =
    useSetRecoilState<boolean>(newProductModalState);

  const handleAddProductsModal = () => {
    setAddProductsModalOpen((state) => !state);
  };
  return (
    <Floating color="primary" onClick={handleAddProductsModal}>
      <AddIcon />
    </Floating>
  );
};

export default FloatingButton;

const Floating = styled(Fab)`
  && {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
`;
