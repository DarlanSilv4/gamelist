import { createLocalAxiosInstance } from "@lib/axiosConfig";

async function getToken() {
  const localAxios = createLocalAxiosInstance();
  const { data: token } = await localAxios.get<Token>("/igdb/token");
  return token;
}

export default getToken;
