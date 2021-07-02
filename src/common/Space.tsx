import styled from "@emotion/styled";

const Space = styled.div<{
  readonly width?: number;
  readonly height?: number;
}>`
  display: flex;
  width: ${(props) => `${props.width}px` ?? `auto`};
  height: ${(props) => `${props.height}px` ?? `auto`};
`;

export default Space;
