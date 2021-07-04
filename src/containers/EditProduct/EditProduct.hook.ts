import { useDidUpdate } from "@ghranek/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProductsData } from "@local/hooks";
import { editProduct } from "@local/services";
import { editProductModalState } from "@local/states";
import { EditProductModal, FormInputs, ProductData } from "@local/types";
import { productFormSchema } from "@local/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

export const useEditProduct = () => {
  const { updateProducts } = useProductsData();

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
    editProduct((editProductsModal.product as ProductData)?.id, data)
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

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    editProductsModal,
    closeEditProductsModal,
  };
};
