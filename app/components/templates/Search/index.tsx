import React from "react";

import Default from "@layouts/Default";

import GameCard from "@elements/GameCard";
import Head from "@elements/Head";
import SearchBar from "@elements/SearchBar";

import { GamesContainer } from "./Search.element";

interface SearchPage {
  games: Game[];
  name: string;
}

function SearchPage({ games, name }: SearchPage) {
  return (
    <React.Fragment>
      <Head title="Search | Gamelist" />
      <Default>
        <SearchBar value={name} />
        <GamesContainer>
          {games.map((game, index) => {
            return <GameCard key={index} game={game} />;
          })}
        </GamesContainer>
      </Default>
    </React.Fragment>
  );
}

export default SearchPage;
