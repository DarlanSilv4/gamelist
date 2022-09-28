import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 70vh;
  justify-content: center;
  max-height: 500px;
  width: 100%;

  @media (min-width: 640px) {
    margin: auto;
    max-width: 580px;
    width: 80%;
  }
`;

export const UserInfo = styled.form`
  background-color: hsl(231, 25%, 20%);
  border-radius: 2vmin;
  color: hsl(0, 0%, 70%);
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  position: relative;
  width: 90%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;

  & > span {
    font-size: 0.9rem;
  }
`;

export const InputContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 8px;

  & > span {
    cursor: pointer;
    font-size: 1.3rem;
  }
`;

export const Input = styled.input<{ error: boolean }>`
  background-color: hsl(231, 25%, 10%);
  border: ${(props) => (props.error ? "2px solid hsl(4, 89%, 58%)" : "none")};
  border-left: ${(props) => !props.error && "2px solid hsl(231, 25%, 7%)"};
  border-radius: 1vmin;
  border-top: ${(props) => !props.error && "2px solid hsl(231, 25%, 7%)"};
  color: white;
  padding: 8px 16px;
  width: 80%;
`;

export const TextInput = styled.textarea<{ error: boolean }>`
  background-color: hsl(231, 25%, 10%);
  border: ${(props) => (props.error ? "2px solid hsl(4, 89%, 58%)" : "none")};
  border-left: ${(props) => !props.error && "2px solid hsl(231, 25%, 7%)"};
  border-radius: 1vmin;
  border-top: ${(props) => !props.error && "2px solid hsl(231, 25%, 7%)"};
  color: white;
  padding: 8px 16px;
  width: 80%;
`;

export const HelperText = styled.span`
  color: hsl(4, 89%, 58%);
  font-size: 0.9rem;
  padding: 0 8px;
`;

export const ButtonWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  height: 100%;
  justify-content: flex-end;
  width: 100%;
`;

export const Button = styled.input`
  align-items: center;
  background-color: hsl(214, 100%, 45%);
  border-radius: 0.2rem;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: 800;
  height: 38px;
  justify-content: center;
  width: 88px;
`;

export const State = styled.p<{ state: "sent" | "sending" }>`
  background-color: ${(props) =>
    props.state === "sent" ? "var(--playing-green)" : "hsl(44, 91%, 53%)"};
  border-radius: 1vmin;
  color: white;
  font-weight: 600;
  padding: 8px;
`;
