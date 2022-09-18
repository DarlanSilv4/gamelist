import axios, { AxiosError } from "axios";

import getGames from "@lib/getGames";

import type { NextApiRequest, NextApiResponse } from "next";

interface ReqBody {
  title: string;
  offset?: number;
  limit?: number;
}

async function searchGamesHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (isEmpty(req.body)) {
    res.status(400).send({ message: "POST body missing." });
    return;
  }

  const { title, offset, limit }: ReqBody = await req.body;

  try {
    const games = await searchGames(title, offset, limit);

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

async function searchGames(title: string, offset = 0, limit = 20) {
  const query = `search "${title}"; fields id, name, platforms.name, platforms.abbreviation, cover.image_id; 
                  limit ${limit}; offset ${offset};`;

  const games = await getGames(query);

  return games;
}

function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export default searchGamesHandler;
