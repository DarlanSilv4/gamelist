import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0;
  position: relative;
  width: 100%;
`;

export const InputBar = styled.input`
  background-color: hsl(231, 24%, 20%);
  border: none;
  border-radius: 0.2rem;
  color: white;
  font-size: 1.3rem;
  height: 64px;
  padding: 0 32px;
  width: 80%;
`;

export const SearchIcon = styled.span`
  color: hsl(0, 0%, 50%);
  position: absolute;
  right: 10%;
  top: 30%;
`;
