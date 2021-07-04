import {
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useEditProduct } from "./EditProduct.hook";

const EditProduct: React.FC = () => {
  const {
    editProductsModal,
    handleSubmit,
    onSubmit,
    closeEditProductsModal,
    control,
    errors,
  } = useEditProduct();
  return (
    <Dialog
      open={editProductsModal.open}
      onClose={closeEditProductsModal}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit product details below and click Edit product button to submit,
            this product added by {editProductsModal?.product?.user} and it will
            still assigned to him, after updating the product.
          </DialogContentText>
          <Controller
            name="name"
            control={control}
            defaultValue={editProductsModal?.product?.name}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={editProductsModal?.product?.name}
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                error={!!errors?.name}
                helperText={errors?.name?.message ?? ""}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            defaultValue={editProductsModal?.product?.price}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={editProductsModal?.product?.price}
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                error={!!errors?.price}
                helperText={errors?.price?.message ?? ""}
              />
            )}
          />

          <Controller
            name="main_image"
            control={control}
            defaultValue={editProductsModal?.product?.main_image}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={editProductsModal?.product?.main_image}
                margin="dense"
                id="main_image"
                label="Image URL"
                type="text"
                fullWidth
                error={!!errors?.main_image}
                helperText={errors?.main_image?.message ?? ""}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue={editProductsModal?.product?.description}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={editProductsModal?.product?.description}
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                error={!!errors?.description}
                helperText={errors?.description?.message ?? ""}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditProductsModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Edit Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProduct;
