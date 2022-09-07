import styled from "styled-components";

export const CardContainer = styled.div<{ state?: GameState }>`
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

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 180px;
  min-width: 100px;
  overflow: hidden;
  position: relative;

  @media (min-width: 1024px) {
    display: inline-block;
    border: 0.15rem solid;
    border-color: transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;
    transition: border-color ease-in-out 300ms;

    &:hover {
      border-color: var(--color);
    }
  }
`;

export const CoverWrapper = styled.figure`
  border-radius: 0.5rem;
  cursor: pointer;
  height: 90%;
  overflow: hidden;
  position: relative;
  width: 100%;

  & img {
    object-fit: cover;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

export const Info = styled.div`
  color: white;
  text-align: left;

  @media (min-width: 1024px) {
    align-items: center;
    background: linear-gradient(
      rgba(2, 0, 36, 0) 0%,
      rgba(19, 21, 32, 0.7) 20%,
      rgba(19, 21, 32, 0.75) 40%,
      rgba(19, 21, 32, 0.8) 60%,
      rgba(19, 21, 32, 0.85) 80%,
      rgba(19, 21, 32, 0.9) 100%
    );
    border-radius: 0.5rem;
    bottom: 0;
    color: white;
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    gap: 0.5rem;
    height: 50%;
    justify-content: center;
    margin: auto;
    opacity: 0;
    padding: 1rem 0;
    position: absolute;
    right: 0;
    text-align: center;
    transition: opacity 300ms ease-in-out;
    width: 100%;
    z-index: 30;

    ${CardContainer}:hover & {
      opacity: 1;
    }
  }
`;

export const GameTitle = styled.span`
  cursor: pointer;
  display: -webkit-box;
  font-size: calc(0.5rem + 1vmin);
  font-weight: 500;
  width: 100%;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media (min-width: 1024px) {
    font-size: 1rem;
    max-height: 40px;
    overflow: hidden;
    width: 90%;

    -webkit-line-clamp: 2;
  }
`;

export const Platform = styled.span`
  display: none;

  @media (min-width: 1024px) {
    display: -webkit-box;
    font-size: 0.8rem;
    max-height: 20px;
    overflow: hidden;
    width: 80%;
    white-space: pre-line;

    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export const AddButton = styled.button`
  display: none;

  @media (min-width: 1024px) {
    display: inline-block;
    background-color: #c8c6d0;
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    height: 25%;
    text-transform: uppercase;
    transition: background-color 300ms ease-in-out;
    width: 90%;

    &:hover {
      background-color: white;
    }
  }
`;

export const StateButton = styled(AddButton)`
  @media (min-width: 1024px) {
    align-items: center;
    background-color: var(--color);
    color: white;
    display: flex;
    font-size: 0.9rem;
    font-weight: 600;
    justify-content: center;
    transition: filter 300ms ease-in-out;
  }

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
  display: flex;
  background-color: #262a40;
  border-radius: 1.5vmin;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 0;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  width: 90%;
`;

export const DropdownOptions = styled.li`
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  height: 30px;
  justify-content: center;
  list-style: none;
  margin: 2.5px 0;
  text-transform: capitalize;

  &:hover {
    background-color: hsl(231, 25%, 35%);
  }
`;
