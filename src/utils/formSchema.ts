import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be 6 charaters at least"),
});

export const productFormSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  main_image: yup.string().required("Product image is required"),
  description: yup.string().required("Product description is required"),
  price: yup.number().required("Product price is required"),
});
