import { useProducts } from "./Products.hook";
import { CardImage, Cards, ProductCard } from "./Products.styles";
import {
  Typography,
  IconButton,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useSetRecoilState } from "recoil";
import { editProductModalState } from "@local/states";
import { ProductData } from "@local/types";

const Products = () => {
  const { products, deleteProduct } = useProducts();
  const setEditProductModal = useSetRecoilState(editProductModalState);
  const openEditProductModal = (product: ProductData) => {
    setEditProductModal({
      open: true,
      product,
    });
    console.log({ product });
  };

  return (
    <Cards>
      {products?.map((product) => (
        <ProductCard key={product?.id}>
          <CardHeader
            avatar={<Avatar>{product?.user?.[0].toUpperCase()}</Avatar>}
            title={product?.name}
            subheader={`${product?.user} - $${product?.price}`}
          />
          <CardImage image={product?.main_image} title={product?.name} />
          <CardContent style={{ height: 110, overflow: "hidden" }}>
            <Typography variant="body2" color="textSecondary" component="p">
              {product?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="Edit"
              onClick={() => openEditProductModal(product)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={() => deleteProduct(product.id)}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </ProductCard>
      ))}
    </Cards>
  );
};

export default Products;
