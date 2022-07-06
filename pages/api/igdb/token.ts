import axios, { AxiosError } from "axios";

import type { NextApiResponse } from "next";

async function tokenHandler(req: NextApiResponse, res: NextApiResponse) {
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  try {
    const { data: token } = await axios.post<Token>(
      `https://id.twitch.tv/oauth2/token`,
      null,
      { params }
    );

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${token.expires_in}, must-revalidate`
    );

    res.status(200).json(token);
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

export default tokenHandler;
