import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import useClickOutside from "hooks/useClickOutside";

import signOut from "@firebase/singOut";

import { useAuth } from "@contexts/AuthContext";

import {
  Avatar,
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownOptions,
  ProfileContainer,
} from "./Profile.element";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownNode = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const [user] = useAuth();

  return (
    <ProfileContainer>
      <Link href="profile/" passHref>
        <Avatar>
          <Image src={user?.avatar || "/me.png"} layout="fill" />
        </Avatar>
      </Link>

      <DropdownContainer ref={dropdownNode}>
        <DropdownButton
          isOpen={isOpen}
          onClick={(e) => {
            e.preventDefault;
            setIsOpen(!isOpen);
          }}
        >
          <span>{user?.name}</span>
          <span className="material-icons-round">expand_more</span>
        </DropdownButton>

        <DropdownOptions isOpen={isOpen}>
          <Link href="profile/" passHref>
            <DropdownItem>My Profile</DropdownItem>
          </Link>
          <Link href="/" passHref>
            <DropdownItem
              onClick={() => {
                signOut();
                return window.location.reload();
              }}
            >
              Sign Out
            </DropdownItem>
          </Link>
        </DropdownOptions>
      </DropdownContainer>
    </ProfileContainer>
  );
}

export default Profile;
