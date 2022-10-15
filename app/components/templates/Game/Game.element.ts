import styled from "styled-components";

export const Banner = styled.div<{ src: string }>`
  background-image: ${(props) => `url(${props.src})`};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 210px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: -1;

  @media (min-width: 1024px) {
    height: 280px;
  }
`;

export const Overlay = styled.div`
  background: linear-gradient(180deg, rgba(255, 0, 0, 0), var(--background));
  height: 100%;
  width: 100%;
`;

export const Header = styled.div`
  color: white;
  display: grid;
  gap: 16px;
  grid-template-columns: 120px auto;
  grid-template-rows: 2fr auto;
  margin-top: 32px;
  position: relative;
  row-gap: 4px;
  width: 100%;

  & > p {
    display: none;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 215px auto;
    grid-template-rows: repeat(6, 48px);
    margin-top: 64px;
    row-gap: 8px;

    & > p {
      color: hsl(0, 0%, 85%);
      display: -webkit-box;
      grid-row: 4 / 7;
      height: 85%;
      line-height: 1.4;
      margin: 0;
      overflow: hidden;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }

    & :nth-child(3) {
      align-self: center;
      grid-row: 6 / 6;
      width: 100%;
    }
  }
`;

export const CoverWrapper = styled.figure`
  border-radius: 0.5rem;
  cursor: pointer;
  grid-row: 1 / 3;
  height: 160px;
  min-width: 120px;
  overflow: hidden;
  position: relative;

  & img {
    object-fit: cover;
  }

  @media (min-width: 1024px) {
    grid-row: 1 / 6;
    height: 270px;
    width: 215px;
  }
`;

export const GameTitle = styled.h1`
  align-self: end;
  display: -webkit-box;
  font-size: 1.4rem;
  margin: 8px 0;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: 1024px) {
    grid-row: 3 / 3;
  }
`;

export const AddButton = styled.button`
  background-color: white;
  border-radius: 0.2rem;
  cursor: pointer;
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  height: 30px;
  text-transform: uppercase;
  transition: background-color 300ms ease-in-out;
  width: 100%;

  @media (min-width: 1024px) {
    align-self: center;
    grid-row: 6 / 6;
  }
`;

export const Nav = styled.nav`
  align-self: center;
  background-color: var(--foreground);
  color: white;
  display: flex;
  height: 48px;
  justify-content: space-evenly;
  margin-left: -8px;
  margin-top: 32px;
  text-align: center;
  width: 100vw;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const NavOption = styled.a<{
  isActive?: boolean;
}>`
  align-items: center;
  background: none;
  border-bottom: ${(props) =>
    props.isActive ? "5px solid hsl(263, 70%, 50%)" : "none"};
  color: ${(props) => (props.isActive ? "white" : "hsl(0, 0%, 70%)")};
  cursor: pointer;
  display: flex;
  font-weight: 500;
  height: 90%;
  text-transform: uppercase;
`;

export const NoScroll = styled.div`
  overflow-x: hidden;
`;

export const Main = styled.main<{ page: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 5%;
  overflow: visible;
  transform: ${(props) => (props.page === "details" ? "translate(-105%)" : "")};
  transition: transform 500ms ease-in-out;

  & > * {
    flex-shrink: 0;
  }

  @media (min-width: 1024px) {
    flex-direction: row-reverse;
    gap: 0;
    margin-top: 32px;
    transform: none;
    width: 100%;
  }
`;

export const Overview = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 16px;
  width: 100%;

  & > * {
    width: 90%;
  }

  & > *:nth-child(2) {
    display: none;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    width: 75%;

    & > *:nth-child(1) {
      display: none;
    }

    & > *:nth-child(2) {
      display: inline;
    }
  }
`;

export const Video = styled.iframe`
  border: none;
  height: 400px;
  margin: 16px 0;
  width: 90%;
`;

export const Container = styled.div`
  color: white;
  font-size: 0.8rem;

  @media (min-width: 1024px) {
    overflow: hidden;
  }

  & > h2 {
    margin-bottom: 0;
  }
`;

export const ContainerHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const ViewAllButton = styled.button`
  display: none;

  @media (min-width: 1024px) {
    align-items: center;
    background: none;
    color: hsl(0, 0%, 80%);
    cursor: pointer;
    display: flex;
    font-size: 0.9rem;
    font-weight: 600;
    transition: color 200ms ease-out;

    &:hover {
      color: hsl(0, 0%, 100%);
    }
  }
`;

export const Description = styled.p`
  background-color: var(--foreground);
  border-radius: 1vmin;
  line-height: 1.4;
  padding: 16px;
`;

export const GamesContainer = styled.div<{ isOpen?: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  height: 250px;
  overflow-x: scroll;
  position: relative;
  width: 100%;

  & > * {
    flex-shrink: 0;
    height: 210px;
    width: 130px;
  }

  @media (min-width: 1024px) {
    flex-wrap: wrap;
    height: ${(props) => (props.isOpen ? "100%" : "calc(180px + 4vw + 2rem)")};
    max-height: ${(props) => (props.isOpen ? "none" : "355px")};
    overflow: visible;
    width: 100%;

    & > * {
      flex-shrink: 1;
      height: calc(180px + 4vw);
      max-height: 319px;
      width: calc((100% / 4) - 2.2rem);
    }
  }
`;

export const Details = styled.div`
  align-items: center;
  background: var(--foreground);
  border-radius: 1vmin;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  gap: 8px;
  height: 100%;
  margin-top: 16px;
  padding: 16px 0;
  width: 100%;

  & h2 {
    margin-bottom: 4px;
  }

  & > * {
    width: 90%;
  }

  @media (min-width: 1024px) {
    font-size: 0.8rem;
    width: 25%;
  }
`;

export const ScoreContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  width: 100%;

  & > :nth-child(3) {
    color: hsl(0, 0%, 70%);
  }
`;

export const Score = styled.span<{ score?: number }>`
  --color: ${(props) =>
    props.score
      ? props.score >= 70
        ? "var(--playing-green)"
        : props.score >= 50
        ? "hsl(45, 100%, 60%)"
        : "var(--dropped-red)"
      : "var(--wishlist-gray)"};

  align-items: center;
  background-color: var(--color);
  border-radius: 2vmin;
  display: flex;
  font-size: 2.2rem;
  font-weight: 600;
  height: 72px;
  justify-content: center;
  width: 72px;
`;

export const WebsitesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Website = styled.a`
  align-items: center;
  background-color: var(--background);
  border-radius: 1vmin;
  display: flex;
  gap: 8px;
  margin: 4px 0;
  padding: 5px;
  width: calc(50% - 18px);
`;

export const WebsiteIcon = styled.figure`
  position: relative;
  height: 32px;
  width: 32px;
`;
