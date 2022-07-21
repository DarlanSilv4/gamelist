import { createLocalAxiosInstance } from "@lib/axiosConfig";
import Homepage from "@templates/Homepage";

import { InferGetStaticPropsType } from "next";

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
  const ONE_DAY_IN_SECONDS = 86400;

  const localApiAxios = createLocalAxiosInstance();

  const { data: popularGames } = await localApiAxios.get<Game[]>(
    "/igdb/all-time-popular"
  );
  const { data: comingSoonGames } = await localApiAxios.get<Game[]>(
    "/igdb/coming-soon"
  );
  const { data: mostAnticipatedGames } = await localApiAxios.get<Game[]>(
    "/igdb/most-anticipated"
  );

  return {
    props: {
      popularGames,
      comingSoonGames,
      mostAnticipatedGames,
    },
    revalidate: ONE_DAY_IN_SECONDS,
  };
}
