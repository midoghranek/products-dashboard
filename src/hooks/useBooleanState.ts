import { useState } from "react";

const useBooleanState = () => {
  const [state, setState] = useState<boolean>(false);
  const toggleState = () => setState((prevState) => !prevState);
  return [state, toggleState];
};

export default useBooleanState;
