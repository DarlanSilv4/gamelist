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
  font-size: calc(0.5rem + 1vmin);
  font-weight: 500;
  width: 100%;

  @media (min-width: 1024px) {
    font-size: 1rem;
    width: 90%;
  }
`;

export const Platform = styled.span`
  display: none;

  @media (min-width: 1024px) {
    display: inline-block;
    font-size: 0.8rem;
    width: 90%;
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
