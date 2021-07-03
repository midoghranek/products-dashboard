import { MouseEventHandler, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseAuthErrorHandler, loginFormSchema } from "@local/utils";
import { auth } from "@local/utils";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useBooleanState } from "@local/hooks";

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

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setLoading(true);
    setPersistence(auth, browserLocalPersistence)
      .then(() => signInWithEmailAndPassword(auth, data.email, data.password))
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          router.push("/").then(() => setLoading(false));
        }
      })
      .catch((err) => {
        setLoginError({
          error: true,
          message: firebaseAuthErrorHandler(err.code),
        });
        console.log({ code: err.code });
      })
      .finally(() => setLoading(false));
  };

  const [showPassword, toggleShowPassword] = useBooleanState();

  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  return {
    onSubmit,
    toggleShowPassword,
    handleMouseDownPassword,
    control,
    handleSubmit,
    errors,
    showPassword,
    loading,
    loginError,
  };
};
