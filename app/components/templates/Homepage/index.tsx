import React from "react";

import Head from "@elements/Head";
import SearchBar from "@elements/SearchBar";

import Default from "@layouts/Default";

import GamesCarousel from "@modules/GamesCarousel";

interface HomepageProps {
  popularGames: Game[];
  mostAnticipatedGames: Game[];
  comingSoonGames: Game[];
}

function Homepage({
  popularGames,
  comingSoonGames,
  mostAnticipatedGames,
}: HomepageProps) {
  return (
    <React.Fragment>
      <Head title="Gamelist" />
      <Default>
        <SearchBar />

        <GamesCarousel title="All Time Popular" games={popularGames} />
        <GamesCarousel title="Most Anticipated" games={mostAnticipatedGames} />
        <GamesCarousel title="Coming Soon" games={comingSoonGames} />
      </Default>
    </React.Fragment>
  );
}

export default Homepage;
