import { createIgdbAxiosInstance } from "@lib/axiosConfig";

import GamePage from "@templates/Game";

function Game({ game }: { game: Game }) {
  return <GamePage game={game} />;
}

export default Game;

interface StaticProps {
  params: {
    slug: string;
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }: StaticProps) {
  const igdbAxios = await createIgdbAxiosInstance();

  const gameQuery = `fields id, aggregated_rating, alternative_names.name, category, collection.games.name, collection.games.slug, 
    collection.games.platforms.abbreviation, collection.games.platforms.name, collection.games.cover.image_id, cover.image_id,dlcs.name, 
    dlcs.slug, dlcs.platforms.name, dlcs.platforms.abbreviation, dlcs.cover.image_id, expansions.name, expansions.slug, 
    expansions.platforms.name, expansions.platforms.abbreviation,expansions.cover.image_id, first_release_date, 
    game_modes.name, genres.name, involved_companies.company.name, involved_companies.company.id, involved_companies.developer, 
    involved_companies.publisher, name, platforms.name, platforms.abbreviation, screenshots.image_id, similar_games.name, 
    similar_games.slug, similar_games.platforms.name,similar_games.platforms.abbreviation,similar_games.cover.image_id, slug, status, 
    summary, videos.name, videos.video_id, websites.url,websites.category;  where slug = "${slug}";`;

  const { data: games } = await igdbAxios.post<Game[]>("/games", gameQuery);

  if (games.length <= 0) return { notFound: true };

  const game = games[0];

  return {
    props: {
      game,
    },
  };
}
