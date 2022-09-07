import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Head from "@elements/Head";
import GameCard from "@elements/GameCard";

import Default from "@layouts/Default";

import {
  Avatar,
  Header,
  ProfileNav,
  ProfileSummary,
  UserName,
  NavOption,
  Games,
} from "./Profile.element";

interface Query {
  id?: string;
  filter?: string;
}

function ProfilePage({ user, games }: { user: User; games: Game[] }) {
  const NAV_OPTIONS: NavOptions[] = [
    "all games",
    "playing",
    "played",
    "dropped",
    "wishlist",
  ];

  const router = useRouter();

  const { query }: { query: Query } = router;
  const filter = query.filter?.toLowerCase();

  const gamelist =
    user.gamelist && user.gamelist instanceof Array ? user.gamelist : [];

  const isActive = (option: NavOptions) => {
    if (option === filter) return true;
    if (filter == null && option === "all games") return true;
  };

  return (
    <React.Fragment>
      <Head title="Gamelist" />
      <Default>
        <Header>
          <Avatar>
            <Image src={user.avatar || "/me.png"} layout="fill" />
          </Avatar>
          <UserName>{`${user.name}'s Gamelist`}</UserName>
          <ProfileSummary>
            {user.profile_summary || "No information given."}
          </ProfileSummary>
        </Header>

        <ProfileNav>
          {NAV_OPTIONS.map((option, id) => {
            return (
              <NavOption
                key={id}
                onClick={() => router.push(`${query.id}?filter=${option}`)}
                isActive={isActive(option)}
                gameState={option}
              >
                {option}
              </NavOption>
            );
          })}
        </ProfileNav>

        <Games>
          {games.map((game, id) => {
            return (
              <GameCard
                game={game}
                gamelist={gamelist}
                key={id}
                isGamelistMode
              />
            );
          })}
        </Games>
      </Default>
    </React.Fragment>
  );
}
export default ProfilePage;
