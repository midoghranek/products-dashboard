import styled from "@emotion/styled";
import { Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useFloatingButton } from "./FloatingButton.hook";

const FloatingButton = () => {
  const { handleAddProductsModal } = useFloatingButton();
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
