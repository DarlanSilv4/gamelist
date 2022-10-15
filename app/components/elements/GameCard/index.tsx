import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@contexts/AuthContext";

import getCoverUrl from "@lib/getCoverUrl";

import AddtoListButton from "@elements/AddToListButton";

import {
  CardContainer,
  CoverWrapper,
  Info,
  GameTitle,
  Platform,
} from "./GameCard.element";

//If you don't send the gamelist as prop, the game state will be
//taken from the authenticated user's game list.
interface GameCardProps {
  game: Game;
  gamelist?: ListedGame[];
  isGamelistMode?: boolean;
}

function GameCard({ game, gamelist, isGamelistMode = false }: GameCardProps) {
  const [user] = useAuth();

  const [gameState, setGameState] = useState<GameState>();

  const coverUrl = getCoverUrl(game.cover);

  const getFormattedPlatforms = (platforms: Platform[]) => {
    if (!platforms) return "";

    const platformsAbbreviation = platforms.map((platform) => {
      return platform.abbreviation;
    });

    return platformsAbbreviation.join(", ");
  };

  useEffect(() => {
    const getGameStateFromAuthUserGamelist = () => {
      if (!user || !user.gamelist) return;

      const listedGame = Object.values(user.gamelist).find(
        (listedGame) => listedGame.game_id == game.id
      );

      setGameState(listedGame?.state);
    };

    const getGameStateFromGamelistProps = () => {
      if (!gamelist) return;

      const listedGame = gamelist.find(
        (listedGame) => listedGame.game_id == game.id
      );

      setGameState(listedGame?.state);
    };

    gamelist
      ? getGameStateFromGamelistProps()
      : getGameStateFromAuthUserGamelist();
  }, [user]);

  return (
    <CardContainer state={gameState}>
      <Link href={`/game/${game.slug}`} passHref>
        <CoverWrapper>
          <Image src={coverUrl} layout="fill" />
        </CoverWrapper>
      </Link>

      <Info>
        <Link href={`/game/${game.slug}`} passHref>
          <GameTitle>{game.name}</GameTitle>
        </Link>
        <Platform>
          {game.platforms && getFormattedPlatforms(game.platforms)}
        </Platform>
        <AddtoListButton
          isGamelistMode={isGamelistMode}
          currentState={gameState}
          gameId={game.id}
        />
      </Info>
    </CardContainer>
  );
}

export default GameCard;
