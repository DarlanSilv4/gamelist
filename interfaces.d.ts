interface Game {
  id: string;
  name: string;
  cover: string;
  platforms: string[];
}

interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface User {
  id: string;
  name: string;
  avatar: string | null;
}
