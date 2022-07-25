import React from "react";

import SearchPage from "@templates/Search";

import getGames from "@lib/getGames";

interface PageProps {
  games: Game[];
  name: string;
}

function Search({ games, name }: PageProps) {
  return <SearchPage games={games} name={name} />;
}

export default Search;

interface ServerProps {
  params: {
    name: string;
  };
}

export async function getServerSideProps({ params: { name } }: ServerProps) {
  const query = `fields id, name, cover.image_id, platforms.name, platforms.abbreviation;
    limit 20; where name ~ *"${name}"*;`;

  const games = await getGames(query);

  return {
    props: {
      name,
      games,
    },
  };
}
