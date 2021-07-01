import Head from "next/head";
import { LoginForm } from "@local/containers";
import { useDidMount } from "@ghranek/hooks";
import { auth } from "@local/utils";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  useDidMount(() => {
    if (auth.currentUser) router.push("/");
  });

  if (auth.currentUser) return <></>;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
