import { auth, db, productFormSchema } from "@local/utils";
import { collection, addDoc } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputs } from "@local/types";
import { useRecoilState } from "recoil";
import { newProductModalState } from "@local/states";
import { useProductsData } from "@local/hooks";

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
    addDoc(collection(db, "products"), {
      user: auth?.currentUser?.email,
      ...data,
    })
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
