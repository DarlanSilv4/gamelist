import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { child, get, ref } from "firebase/database";

import { database } from "@firebase/firebaseConfig";

import Head from "@elements/Head";
import GameCard from "@elements/GameCard";

import Default from "@layouts/Default";

import { createLocalAxiosInstance } from "@lib/axiosConfig";

import {
  Avatar,
  Header,
  ProfileNav,
  ProfileSummary,
  UserName,
  NavOption,
  Games,
} from "./Profile.element";
import Skeleton from "@elements/Skeleton";

interface Query {
  username?: string;
  filter?: string;
}

function ProfilePage({ user }: { user: User }) {
  const ALL_GAMES = "all games";

  const NAV_OPTIONS: NavOptions[] = [
    "all games",
    "playing",
    "played",
    "dropped",
    "wishlist",
  ];

  const [games, setGames] = useState<Game[]>([]);
  const [gamelist, setGamelist] = useState<ListedGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { query }: { query: Query } = router;
  const filter = query.filter?.toLowerCase() || ALL_GAMES;

  const isActive = (option: NavOptions) => {
    if (option === filter) return true;
    if (filter == null && option === ALL_GAMES) return true;
  };

  useEffect(() => {
    const getGamelist = async () => {
      const snapshot = await get(
        child(ref(database), `users/${user.id}/gamelist`)
      );

      if (!snapshot.exists()) return;

      const gamelistObj = snapshot.toJSON() as ArrayLike<ListedGame>;
      const gamelistArray = Object.values(gamelistObj);

      setGamelist(gamelistArray);
    };

    getGamelist();
  }, []);

  useEffect(() => {
    const isValidFilter = (filter: string) => {
      return String(NAV_OPTIONS).includes(filter);
    };

    const getGames = async () => {
      setIsLoading(true);

      if (!isValidFilter(filter)) {
        setGames([]);
        setIsLoading(false);
        return;
      }

      const filteredGamelist = gamelist.filter((game) => {
        if (game.state === filter || filter === ALL_GAMES) return game.game_id;
      });

      if (filteredGamelist.length === 0) {
        setGames([]);
        setIsLoading(false);
        return;
      }

      const gamesIDs = filteredGamelist.map((game) => game.game_id);

      const localAxios = createLocalAxiosInstance();
      const { data: games } = await localAxios.post<Game[]>("/igdb/games", {
        gamesIDs,
      });

      setGames(games);
      setIsLoading(false);
      return;
    };

    getGames();
  }, [filter, gamelist]);

  const displayGameCards = () => {
    if (games.length > 0) {
      return games.map((game, id) => {
        return (
          <GameCard game={game} gamelist={gamelist} key={id} isGamelistMode />
        );
      });
    }

    return <p>is Empty</p>;
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
                onClick={() =>
                  router.push(`${query.username}?filter=${option}`)
                }
                isActive={isActive(option)}
                gameState={option}
              >
                {option}
              </NavOption>
            );
          })}
        </ProfileNav>

        <Games>
          {isLoading ? (
            <Skeleton height={100} width={180} number={5} />
          ) : (
            displayGameCards()
          )}
        </Games>
      </Default>
    </React.Fragment>
  );
}
export default ProfilePage;
