import { MouseEventHandler, useState } from "react";

const useBooleanState = (): [boolean, MouseEventHandler<HTMLElement>] => {
  const [state, setState] = useState<boolean>(false);
  const toggle: MouseEventHandler<HTMLElement> = () =>
    setState((prevState) => !prevState);
  return [state, toggle];
};

export default useBooleanState;
