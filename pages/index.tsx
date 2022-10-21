import { InferGetStaticPropsType } from "next";

import Homepage from "@templates/Homepage";

import axios from "axios";

function Home({
  popularGames,
  comingSoonGames,
  mostAnticipatedGames,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Homepage
      popularGames={popularGames}
      comingSoonGames={comingSoonGames}
      mostAnticipatedGames={mostAnticipatedGames}
    />
  );
}

export default Home;

export async function getStaticProps() {
  const FIVE_DAYS_IN_SECONDS = 432000;

  const todayInEpochTime = Math.floor(new Date().getTime() / 1000.0);

  const popularGamesQuery = `fields id, name, cover.image_id, platforms.name, platforms.abbreviation, slug;
  sort follows desc; where follows != null; limit 20;`;

  const comingSoonGamesQuery = `fields id, name, cover.image_id, platforms.name, 
  platforms.abbreviation, slug; sort first_release_date asc; 
  where first_release_date > ${todayInEpochTime} & first_release_date != null; limit 20;`;

  const mostAnticipatedGamesQuery = `fields id, name, cover.image_id, platforms.name, platforms.abbreviation, slug; 
    sort hypes desc; where first_release_date > ${todayInEpochTime} & hypes != null; limit 20;`;

  const popularGames = await getGames(popularGamesQuery);
  const comingSoonGames = await getGames(comingSoonGamesQuery);
  const mostAnticipatedGames = await getGames(mostAnticipatedGamesQuery);

  return {
    props: {
      popularGames,
      comingSoonGames,
      mostAnticipatedGames,
    },
    revalidate: FIVE_DAYS_IN_SECONDS,
  };
}

async function getGames(query: string) {
  const igdbAxios = await createAxiosInstance();
  const { data: games } = await igdbAxios.post<Game[]>("/games", query);
  return games;
}

async function createAxiosInstance() {
  const token = await getToken();

  return axios.create({
    baseURL: "https://api.igdb.com/v4",
    headers: {
      Accept: "application/json",
      "Client-ID": String(process.env.CLIENT_ID),
      Authorization: `Bearer ${token.access_token}`,
    },
  });
}

async function getToken() {
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  const { data: token } = await axios.post<Token>(
    `https://id.twitch.tv/oauth2/token`,
    null,
    { params }
  );

  return token;
}
