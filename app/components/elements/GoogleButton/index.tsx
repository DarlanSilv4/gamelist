import Image from "next/image";

import signInWithGoogle from "@firebase/signInWithGoogle";

import { ButtonContainer } from "./GoogleButton.element";

function GoogleButton() {
  return (
    <ButtonContainer
      onClick={async () => {
        await signInWithGoogle();
      }}
    >
      <Image src="/svg/google_logo.svg" width={32} height={32} />
      <span>Sign in with Google</span>
    </ButtonContainer>
  );
}

export default GoogleButton;
