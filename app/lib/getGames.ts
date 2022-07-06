import { createIgdbAxiosInstance } from "@lib/axiosConfig";

async function getGames(query: string) {
  const igdbAxios = await createIgdbAxiosInstance();
  const { data: games } = await igdbAxios.post<Game[]>("/games", query);
  return games;
}

export default getGames;
