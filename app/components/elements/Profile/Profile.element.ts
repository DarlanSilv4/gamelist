import styled from "styled-components";

export const ProfileContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
`;

export const Avatar = styled.a`
  border-radius: 100vmin;
  cursor: pointer;
  height: 40px;
  overflow: hidden;
  position: relative;
  width: 40px;
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
  align-items: center;
  background: none;
  color: ${(props) => (props.isOpen ? "white" : "hsl(0, 0%, 50%)")};
  cursor: pointer;
  display: flex;
  padding: 0;
  transition: color 300ms ease-in-out;
  width: fit-content;

  & > :nth-child(1) {
    color: white;
    font-weight: 500;
  }

  & > :nth-child(2) {
    font-size: 2rem;
  }

  &:hover {
    color: white;
  }
`;

export const DropdownOptions = styled.div<{ isOpen: boolean }>`
  background-color: hsl(231, 25%, 20%);
  border-radius: 0.3rem;
  color: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  list-style-type: none;
  padding: 0;
  right: 5px;
  top: 50px;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  width: 145px;
  z-index: 80;
`;

export const DropdownItem = styled.a`
  align-items: center;
  display: flex;
  height: 2rem;
  margin: 4px 0;
  padding: 2px 16px;

  &:hover {
    background-color: hsl(231, 25%, 35%);
  }
`;
