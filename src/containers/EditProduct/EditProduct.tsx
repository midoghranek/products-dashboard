import {
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
import { setDoc, doc } from "firebase/firestore";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditProductModal, FormInputs, ProductData } from "@local/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editProductModalState, productListState } from "@local/states";
import { useDidUpdate } from "@ghranek/hooks";

const EditProduct: React.FC = () => {
  const setProducts = useSetRecoilState(productListState);

  const updateProducts = () => {
    getDataFromFirestoreCollection("products").then((data) =>
      setProducts(data as ProductData[])
    );
  };

  const [editProductsModal, setEditProductsModal] =
    useRecoilState<EditProductModal>(editProductModalState);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(productFormSchema),
  });

  const closeEditProductsModal = () => {
    setEditProductsModal({
      open: false,
      product: null,
    });
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setDoc(
      doc(db, "products", (editProductsModal?.product as ProductData)?.id),
      {
        ...editProductsModal?.product,
        ...data,
      }
    )
      .then(() => updateProducts())
      .then(() => closeEditProductsModal());
  };

  useDidUpdate(() => {
    if (editProductsModal?.product) {
      setValue("id", editProductsModal?.product?.id as string);
      setValue("name", editProductsModal?.product?.name as string);
      setValue("price", editProductsModal?.product?.price as number);
      setValue("main_image", editProductsModal?.product?.main_image as string);
      setValue(
        "description",
        editProductsModal?.product?.description as string
      );
    }
  }, [editProductsModal?.product]);

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
