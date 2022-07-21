import React from "react";

import Image from "next/image";

import Head from "@elements/Head";
import GoogleButton from "@elements/GoogleButton";

import { useAuth } from "@contexts/AuthContext";

import { Loading, Wrapper } from "./Login.element";

function Login() {
  const [user, isLoading] = useAuth();

  return (
    <React.Fragment>
      <Head title="Login | Gamelist" />
      <Wrapper>
        <figure>
          <Image src="/svg/logo.svg" width={160} height={160} />
        </figure>
        {isLoading || user ? <Loading /> : <GoogleButton />}
      </Wrapper>
    </React.Fragment>
  );
}

export default Login;
