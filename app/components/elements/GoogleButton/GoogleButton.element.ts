import styled from 'styled-components';

export const ButtonContainer = styled.button`
  align-items: center;
  background-color: white;
  border-radius: 0.2rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  cursor: pointer;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 8px 18px;
  transition: box-shadow 0.3s ease-in-out;
  width: 320px;

  &:active{
    background-color: #EEEEEE;
  }

  &:hover{
    box-shadow: 0px 0px 8px rgba(66, 133, 244, 0.7);
  }

  &:focus{
    box-shadow: 0px 0px 1px 3px rgba(66, 133, 244, 0.7);
  }

  & span{
    color: rgba(0, 0, 0, 54%);
    font-family: Roboto;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;