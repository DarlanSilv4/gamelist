import styled from "styled-components";

export const Header = styled.header`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-between;
  margin: auto;
  margin-top: 48px;
  max-width: 420px;
  width: 90%;
`;

export const Avatar = styled.figure`
  border: 4px solid hsla(327, 79%, 48%, 1);
  border-radius: 100%;
  height: 123px;
  overflow: hidden;
  position: relative;
  width: 123px;
`;

export const UserName = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const ProfileSummary = styled.p`
  font-weight: 300;
  margin: 0;
  text-align: center;
`;

export const ProfileNav = styled.div`
  align-items: center;
  background-color: hsla(231, 25%, 20%, 1);
  display: flex;
  font-size: 0.8rem;
  height: 48px;
  justify-content: space-evenly;
  margin: 32px 0;
  margin-left: -8px;
  width: 100vw;

  @media (min-width: 1024px) {
    border-radius: 1vmin;
    font-size: inherit;
    margin: 32px auto;
    width: 50%;
  }
`;

export const NavOption = styled.button<{
  isActive?: boolean;
  gameState?: NavOptions;
}>`
  --color: ${(props) =>
    props.gameState === "playing"
      ? "var(--playing-green)"
      : props.gameState === "played"
      ? "var(--played-blue)"
      : props.gameState === "dropped"
      ? "var(--dropped-red)"
      : props.gameState === "wishlist"
      ? "var(--wishlist-gray)"
      : "#6d28d9"};

  background: none;
  border-bottom: ${(props) =>
    props.isActive ? "5px solid var(--color)" : "none"};
  cursor: pointer;
  color: ${(props) => (props.isActive ? "white" : "hsl(0, 0%, 70%)")};
  font-weight: 500;
  height: 100%;
  text-transform: uppercase;

  &:hover {
    border-bottom: 5px solid var(--color);
    color: white;
  }

  @media (min-width: 1024px) {
    font-weight: 600;
  }
`;

export const Games = styled.section`
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  margin-bottom: 18px;
  min-height: 100px;
  width: 100%;

  & > * {
    height: 35vw;
    width: calc(100% - 0.1rem);
  }

  @media (min-width: 520px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;

    & > * {
      height: calc(180px + 4vw);
      margin: 0 var(--gameCard-margin);
      max-height: 319px;
      max-width: 15%;
    }
  }
`;

export const SeeGameList = styled.div`
  align-items: center;
  background-color: hsla(231, 25%, 20%, 1);
  display: flex;
  height: 3rem;
  justify-content: center;
  margin: 16px 0 16px -8px;
  width: 100vw;

  & a {
    color: white;
    font-size: 0.9rem;
    text-align: center;
    text-decoration: underline;
  }

  @media (min-width: 1024px) {
    border-radius: 1vmin;
    margin: 16px 0;
    width: 100%;
  }
`;
