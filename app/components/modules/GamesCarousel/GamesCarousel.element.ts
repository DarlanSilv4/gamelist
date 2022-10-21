import styled from "styled-components";

export const CarouselContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h2`
  color: white;
`;

export const Carousel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: hidden;
  position: relative;
  width: 100%;
`;

export const GameGroup = styled.div<{ index: number }>`
  --carousel-index: ${(props) => props.index};
  --items-per-screen: 5;
  --gameCard-border: 0.125rem;
  --gameCard-padding: 0.55rem;
  --gameCard-margin: 0.05rem;

  @-moz-document url-prefix() {
    --gameCard-border: 0.15rem;
    --gameCard-padding: 0.5rem;
    --gameCard-margin: 0.05rem;
  }

  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  overflow: hidden;
  width: 100%;
  justify-content: center;

  & > *:nth-child(n + 7) {
    display: none;
  }

  & > * {
    height: 35vw;
    width: calc(100% - 1.6px);
  }

  @media (min-width: 520px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);

    & > *:nth-child(n + 7) {
      display: flex;
    }

    & > *:nth-child(n + 9) {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0;
    justify-content: start;
    margin: 8px 0;
    overflow: visible;
    transform: translateX(calc(var(--carousel-index) * -100%));
    transition: transform 500ms ease-in-out;
    width: 100%;

    & > *:nth-child(n) {
      display: inline-block;
    }

    & > * {
      flex: 1 0
        calc(
          (100% / var(--items-per-screen)) -
            (
              (var(--gameCard-padding) + var(--gameCard-border)) * 2 +
                var(--gameCard-margin)
            )
        );
      height: calc(180px + 4vw);
      margin: 0 var(--gameCard-margin);
      max-height: 319px;
      max-width: calc(100% / var(--items-per-screen));
    }
  }

  @media (min-width: 1280px) {
    & > * {
      height: calc(180px + 7vw);
    }
  }
`;
export const DirectionButton = styled.button`
  background-color: hsl(231, 25%, 17%);
  border-radius: 10%;
  color: white;
  cursor: pointer;
  display: none;
  font-size: 1rem;
  height: 2rem;
  margin: 0 0.2rem;
  transition: background-color 200ms ease-in-out;
  width: 2rem;

  &:hover {
    background-color: hsl(231, 25%, 27%);
  }

  &:focus {
    border: 1px solid white;
  }

  @media (min-width: 1024px) {
    display: inline-block;
  }
`;

export const Footer = styled.footer`
  display: none;
  height: 0.5rem;
  width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  width: 30%;
`;

export const ProgressItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? "hsl(0, 0%, 100%)" : "hsl(0, 0%, 30%)"};
  border-radius: 10%;
  height: 100%;
  width: 2rem;
`;
