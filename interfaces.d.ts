interface Cover {
  id: number;
  image_id: string;
}

interface Game {
  id: string;
  name: string;
  cover: Cover;
  platforms: Platform[];
}

type GameState = "playing" | "played" | "dropped" | "wishlist";

// Since the user list of games and the games themselves are from different APIs,
// it was necessary to create a new interface only for the games that are in the
// user list.
interface ListedGame {
  game_id: string;
  state: GameState;
}

interface Platform {
  id: number;
  image_id: string;
  abbreviation: string;
  name: string;
}

interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface User {
  id: string;
  name: string;
  profile_summary?: string;
  avatar: string | null;
  //Firebase does not accept arrays, so the gamelist comes in object formats and then it's convert to array.
  gamelist?: ListedGame[] | { [key: string]: ListedGame };
}
