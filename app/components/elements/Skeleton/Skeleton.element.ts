import styled, { keyframes } from "styled-components";

const Loading = keyframes`
  from {
    left: -200px;
  }
  to{
    left: 100%
  }
`;

export const StyledSkeleton = styled.div<{ width: number; height: number }>`
  background-color: hsla(0, 0%, 100%, 0.05);
  border-radius: 4px;
  box-shadow: 1px 1px 20px hsl(0, 0%, 0%);
  height: ${(props) => props.height};
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  margin: 8px;

  ::before {
    animation: ${Loading} 2000ms ease-in-out infinite;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      hsla(231, 25%, 30%, 0.8),
      rgba(0, 0, 0, 0)
    );
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    left: -200px;
    top: 0;
    width: 200px;
  }
`;
