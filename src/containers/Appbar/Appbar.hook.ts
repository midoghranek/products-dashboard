import { useRouter } from "next/dist/client/router";
import { auth } from "@local/utils";

export const useAppbar = () => {
  const router = useRouter();

  const signOut = () => {
    auth.signOut().then(() => router.push("/login"));
  };
  return { signOut };
};
