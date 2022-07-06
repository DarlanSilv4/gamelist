interface Game {
  id: string;
  name: string;
  cover: string;
  platforms: string[];
}

interface User{
  id: string,
  name: string,
  avatar: string | null
}