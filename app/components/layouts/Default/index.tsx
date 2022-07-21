import React from "react";
import Header from "@modules/Header";
import { Main } from "./Default.element";

interface Props {
  children: React.ReactNode;
}

function Default({ children }: Props) {
  return (
    <React.Fragment>
      <Header />
      <Main>{children}</Main>
    </React.Fragment>
  );
}

export default Default;
