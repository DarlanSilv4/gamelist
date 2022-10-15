import styled from "styled-components";

export const AddButton = styled.button`
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  justify-content: center;
  height: 25%;
  min-height: 40px;
  text-transform: uppercase;
  transition: background-color 300ms ease-in-out;
  width: 90%;

  @media (min-width: 1024px) {
    background-color: hsl(255, 10%, 85%);

    &:hover {
      background-color: white;
    }
  }
`;

export const StateButton = styled(AddButton)<{ state: GameState }>`
  --color: ${(props) =>
    props.state === "playing"
      ? "var(--playing-green)"
      : props.state === "played"
      ? "var(--played-blue)"
      : props.state === "dropped"
      ? "var(--dropped-red)"
      : props.state === "wishlist"
      ? "var(--wishlist-gray)"
      : "hsl(258, 100%, 56%)"};

  align-items: center;
  background-color: var(--color);
  color: white;
  display: flex;
  font-size: 0.9rem;
  font-weight: 600;
  justify-content: center;
  transition: filter 300ms ease-in-out;

  &:hover {
    background-color: var(--color);
    filter: brightness(120%);
  }

  & :nth-child(1) {
    text-align: center;
    width: 70%;
  }

  & :nth-child(2) {
    align-items: center;
    border-left: 2px solid white;
    display: flex;
    font-size: 2rem;
    height: 70%;
    justify-content: center;
    text-align: center;
    width: 15%;
  }
`;

export const StateLabel = styled.span`
  align-items: center;
  background-color: var(--color);
  border-radius: 0.2rem;
  bottom: 20%;
  color: white;
  display: flex;
  font-size: 0.9rem;
  font-weight: 600;
  height: 12%;
  justify-content: center;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  user-select: none;
  width: 90%;
  z-index: 20;

  @media (min-width: 1024px) {
    height: 25%;
    margin: 0;
    position: static;
  }
`;

export const Dropdown = styled.ul<{ isOpen: boolean }>`
  background-color: #262a40;
  border-radius: 1.5vmin;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-width: 220px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  width: 90%;
`;

export const DropdownOptions = styled.li`
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  height: 35px;
  justify-content: center;
  list-style: none;
  margin: 2.5px 0;
  text-transform: capitalize;

  &:hover {
    background-color: hsl(231, 25%, 35%);
  }
`;

export const DropdownRemoveOption = styled(DropdownOptions)`
  color: var(--dropped-red);
`;
