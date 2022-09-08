import { InferGetServerSidePropsType } from "next";

import Homepage from "@templates/Homepage";

import { createLocalAxiosInstance } from "@lib/axiosConfig";

function Home({
  popularGames,
  comingSoonGames,
  mostAnticipatedGames,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Homepage
      popularGames={popularGames}
      comingSoonGames={comingSoonGames}
      mostAnticipatedGames={mostAnticipatedGames}
    />
  );
}

export default Home;

export async function getServerSideProps() {
  const localApiAxios = createLocalAxiosInstance();

  try {
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
    };
  } catch (error) {
    return { notFound: true };
  }
}
