import { productFormSchema } from "@local/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputs } from "@local/types";
import { useRecoilState } from "recoil";
import { newProductModalState } from "@local/states";
import { useProductsData } from "@local/hooks";
import { addProduct } from "@local/services";

export const useNewProduct = () => {
  const { updateProducts } = useProductsData();

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
    addProduct(data)
      .then(() => updateProducts())
      .then(() => handleAddProductsModal());
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    handleAddProductsModal,
    addProductsModalOpen,
  };
};
