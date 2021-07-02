import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
};

const NoSSR: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
