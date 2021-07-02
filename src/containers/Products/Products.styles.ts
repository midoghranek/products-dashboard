import styled from "@emotion/styled";
import { Card, CardMedia } from "@material-ui/core";

export const Cards = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
  padding-left: 30px;

  flex-direction: column;
  height: 810px;
  flex-wrap: wrap;
  overflow: auto;
  padding-bottom: 30px;
  align-content: flex-start;
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
