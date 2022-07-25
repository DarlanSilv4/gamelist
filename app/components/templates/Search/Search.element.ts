import styled from "styled-components";

export const GamesContainer = styled.div`
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
`;
