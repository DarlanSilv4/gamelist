import axios, { AxiosError } from "axios";

import getGames from "@lib/getGames";

import type { NextApiRequest, NextApiResponse } from "next";

async function allTimePopularHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const SEVEN_DAYS_IN_SECONDS = "604800";

  try {
    const games = await getAllTimePopularGames();

    res
      .status(200)
      .setHeader(
        "Cache-Control",
        `public, s-maxage=${SEVEN_DAYS_IN_SECONDS}, stale-while-revalidate`
      )
      .json(games);
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.statusText);
    }

    res
      .status(500)
      .json(
        "The server has encountered a situation it does not know how to handle."
      );
  }
}

async function getAllTimePopularGames() {
  const query = `fields id, name, cover.image_id, platforms.name, platforms.abbreviation;
    sort follows desc; where follows != null; limit 20;`;

  const games = await getGames(query);

  return games;
}

export default allTimePopularHandler;
