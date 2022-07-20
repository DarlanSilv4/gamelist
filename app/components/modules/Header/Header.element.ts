import styled from "styled-components";

export const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px auto;
  width: 95%;
`;

export const Logo = styled.a`
  position: relative;
  height: 56px;
  width: 56px;
`;

export const LoginButton = styled.a`
  align-items: center;
  background-color: hsl(214, 100%, 45%);
  border-radius: 0.2rem;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: 800;
  height: 40px;
  justify-content: center;
  transition: all 200ms ease-in;
  width: 82px;

  &:hover {
    background-color: white;
    color: black;
  }
`;
