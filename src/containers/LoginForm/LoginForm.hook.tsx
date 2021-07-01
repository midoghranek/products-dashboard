import { MouseEventHandler, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "@local/utils";
import { auth } from "@local/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

type FormInputs = {
  readonly email: string;
  readonly password: string;
};

export const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(loginFormSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [loginError, setLoginError] = useState<{
    error: boolean;
    message?: string;
  }>({
    error: false,
  });

  const errorHandler = (code: string) => {
    if (code === "auth/user-not-found") return `User not found`;
    if (code === "auth/wrong-password") return `Wrong password`;
    return `Something went wrong please try again`;
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          router.push("/").then(() => setLoading(false));
        }
      })
      .catch((err) => {
        setLoginError({ error: true, message: errorHandler(err.code) });
        console.log({ code: err.code });
      })
      .finally(() => setLoading(false));
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  return {
    onSubmit,
    handleShowPassword,
    handleMouseDownPassword,
    control,
    handleSubmit,
    errors,
    showPassword,
    loading,
    loginError,
  };
};
