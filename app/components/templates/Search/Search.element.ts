import styled from "styled-components";

export const GamesContainer = styled.div`
  display: grid;
  gap: 2rem 1rem;
  overflow-x: hidden;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  & > p {
    color: white;
    font-size: 1.2rem;
    text-align: center;
  }

  & > * {
    height: 35vw;
    width: calc(100% - 0.1rem);
  }

  @media (min-width: 520px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 16px;
    margin: 1rem 0;
    width: 100%;
    position: relative;

    & > * {
      height: 275px;
      width: 205px;
    }
  }
`;
