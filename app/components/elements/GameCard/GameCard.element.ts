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

  & :nth-child(3) {
    display: none;
  }

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

    & :nth-child(3) {
      display: flex;
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
