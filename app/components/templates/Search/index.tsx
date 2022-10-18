import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import GameCard from "@elements/GameCard";
import Head from "@elements/Head";
import Default from "@layouts/Default";

import SearchBar from "@elements/SearchBar";

import { createLocalAxiosInstance } from "@lib/axiosConfig";

import { GamesContainer } from "./Search.element";
import Skeleton from "@elements/Skeleton";

function SearchPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { title } = router.query;

  useEffect(() => {
    if (title == null) {
      router.push("/");
      return;
    }

    const getGames = async () => {
      setIsLoading(true);

      const localAxios = createLocalAxiosInstance();
      const { data: games } = await localAxios.post<Game[]>(
        "/igdb/search-games",
        {
          title,
        }
      );

      setGames(games);
      setIsLoading(false);
    };

    getGames();
  }, [title]);

  const displayGameCards = () => {
    if (games.length > 0) {
      return games.map((game, id) => {
        return <GameCard game={game} key={id} />;
      });
    }

    return <p>Oops! No Results</p>;
  };

  return (
    <React.Fragment>
      <Head title="Search | Gamelist" />
      <Default>
        <SearchBar value={title ? String(title) : ""} focus={true} />
        {title &&
          (isLoading ? (
            <GamesContainer>
              <Skeleton height={100} width={180} number={5} />
            </GamesContainer>
          ) : (
            <GamesContainer>{displayGameCards()}</GamesContainer>
          ))}
      </Default>
    </React.Fragment>
  );
}

export default SearchPage;
