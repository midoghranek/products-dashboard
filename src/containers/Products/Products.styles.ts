import styled from "@emotion/styled";
import { Card, CardMedia } from "@material-ui/core";

export const Cards = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
  margin-left: 50px;
`;

export const ProductCard = styled(Card)`
  && {
    width: 300px;
    height: 750px;
    margin-right: 20px;
  }
`;

export const CardImage = styled(CardMedia)`
  && {
    height: 500px;
  }
`;
