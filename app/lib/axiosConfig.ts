import axios from "axios";
import getToken from "@lib/getToken";

async function createIgdbAxiosInstance() {
  const token = (await getToken()).access_token;

  return axios.create({
    baseURL: "https://api.igdb.com/v4",
    headers: {
      Accept: "application/json",
      "Client-ID": String(process.env.CLIENT_ID),
      Authorization: `Bearer ${token}`,
    },
  });
}

function createLocalAxiosInstance() {
  const localAxios = axios.create();

  process.env.NODE_ENV === "development"
    ? (localAxios.defaults.baseURL =
        process.env.NEXT_PUBLIC_BASE_URL_LOCAL + "/api")
    : (localAxios.defaults.baseURL =
        process.env.NEXT_PUBLIC_DOMAIN_PROD + "/api");

  return localAxios;
}

export { createIgdbAxiosInstance, createLocalAxiosInstance };
