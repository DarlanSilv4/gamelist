import styled from "styled-components";

export const Main = styled.main`
  margin: 0 0.5rem;
  max-width: 1280px;

  @media (min-width: 1024px) {
    margin: auto;
    width: 90%;
  }
`;

export const Footer = styled.footer`
  align-items: center;
  background-color: var(--foreground);
  color: hsl(0, 0%, 70%);
  display: flex;
  flex-direction: column-reverse;
  gap: 5px;
  height: 56px;
  justify-content: center;
  margin-top: 2rem;
  padding: 0 5%;
  width: 90%;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const DevelopInfo = styled.div`
  display: flex;
  gap: 5px;

  & span > a {
    color: white;
    text-decoration: none;
  }
`;

export const Github = styled.a`
  display: none;

  @media (min-width: 1024px) {
    border-radius: 100%;
    cursor: pointer;
    display: initial;

    &:hover {
      background-color: var(--background);
    }
  }
`;

export const GithubIcon = styled.figure`
  height: 28px;
  position: relative;
  width: 28px;
`;
