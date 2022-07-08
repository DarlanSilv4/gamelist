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

interface Platform {
  id: number;
  image_id: string;
  abbreviation: string;
  platform_logo: string;
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
