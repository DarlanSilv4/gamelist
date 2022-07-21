import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  width: 100%;
`;

const Rotation = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: inline-block;
  height: 80px;
  width: 80px;

  &:after {
    animation: ${Rotation} 1.2s linear infinite;
    border: 6px solid hsl(100, 100%, 90%);
    border-color: hsl(100, 100%, 90%) transparent hsl(100, 100%, 90%)
      transparent;
    border-radius: 50%;
    content: " ";
    display: block;
    height: 64px;
    margin: 8px;
    width: 64px;
  }
`;
