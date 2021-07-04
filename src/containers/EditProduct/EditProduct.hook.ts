import { useDidUpdate } from "@ghranek/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProductsData } from "@local/hooks";
import { editProductModalState } from "@local/states";
import { EditProductModal, FormInputs, ProductData } from "@local/types";
import { db, productFormSchema } from "@local/utils";
import { doc, setDoc } from "firebase/firestore";
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

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    editProductsModal,
    closeEditProductsModal,
  };
};
