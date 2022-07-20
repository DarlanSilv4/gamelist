import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@contexts/AuthContext";

import Profile from "@elements/Profile";

import { HeaderContainer, LoginButton, Logo } from "./Header.element";

function Header() {
  const [user] = useAuth();

  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <Logo>
          <Image src="/svg/logo.svg" layout="fill" />
        </Logo>
      </Link>
      {user ? (
        <Profile />
      ) : (
        <Link href={"/login"}>
          <LoginButton>Sign In</LoginButton>
        </Link>
      )}
    </HeaderContainer>
  );
}

export default Header;
