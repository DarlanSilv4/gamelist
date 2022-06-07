import Image from "next/image";

import GoogleButton from "@elements/GoogleButton";

import { Wrapper } from "./Login.element";

function Login() {
  return (
    <Wrapper>
      <figure>
        <Image src="/svg/logo.svg" width={160} height={160} />
      </figure>
      <GoogleButton />
    </Wrapper>
  );
}

export default Login;
