import type { AppProps } from "next/app";
import { GlobalStyles } from "@local/styles";
import { CssBaseline } from "@material-ui/core";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <CssBaseline />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
