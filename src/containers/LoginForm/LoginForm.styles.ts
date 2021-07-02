import styled from "@emotion/styled";
import { CircularProgress, Paper } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const CustomPaper = styled(Paper)`
  && {
    max-width: calc(100% - 40px);
    min-width: 500px;
    min-height: 400px;
    position: relative;
  }
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: #fff;
  padding: 50px;
  position: relative;
`;

export const CenterBox = styled.div`
  min-height: 400px;
  min-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffffed;
  z-index: 2;
`;
