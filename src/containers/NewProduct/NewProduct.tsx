import {
  auth,
  db,
  getDataFromFirestoreCollection,
  productFormSchema,
} from "@local/utils";
import {
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import { collection, addDoc } from "firebase/firestore";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputs, ProductData } from "@local/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newProductModalState, productListState } from "@local/atoms";

const NewProduct = () => {
  const setProducts = useSetRecoilState(productListState);

  const updateProducts = () => {
    getDataFromFirestoreCollection("products").then((data) =>
      setProducts(data as ProductData[])
    );
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(productFormSchema),
  });

  const [addProductsModalOpen, setAddProductsModalOpen] =
    useRecoilState<boolean>(newProductModalState);

  const handleAddProductsModal = () => {
    setAddProductsModalOpen((state) => !state);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    addDoc(collection(db, "products"), {
      user: auth?.currentUser?.email,
      ...data,
    })
      .then(() => updateProducts())
      .then(() => handleAddProductsModal());
  };

  return (
    <Dialog
      open={addProductsModalOpen}
      onClose={handleAddProductsModal}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add product details below and click Add product button to submit
          </DialogContentText>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
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
            render={({ field }) => (
              <TextField
                {...field}
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
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
          <Button onClick={handleAddProductsModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewProduct;
