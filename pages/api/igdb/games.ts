import axios, { AxiosError } from "axios";

import getGames from "@lib/getGames";

import type { NextApiRequest, NextApiResponse } from "next";

interface ReqBody {
  gamesIDs: string[];
  offset?: number;
  limit?: number;
}

async function gamesHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (isEmpty(req.body)) {
    res.status(400).send({ message: "POST body missing." });
    return;
  }

  const { gamesIDs, offset, limit }: ReqBody = await req.body;

  try {
    const games = await getGamesFromIGDB(gamesIDs, offset, limit);

    res.status(200).json(games);
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

async function getGamesFromIGDB(gamesIDs: string[], offset = 0, limit = 50) {
  const gamesIDsConcatened = gamesIDs.concat();
  const query = `fields name, platforms.name, platforms.abbreviation, cover.image_id, slug; sort name asc; 
                  limit ${limit}; offset ${offset}; where id = (${gamesIDsConcatened});`;

  const games = await getGames(query);

  return games;
}

function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export default gamesHandler;
