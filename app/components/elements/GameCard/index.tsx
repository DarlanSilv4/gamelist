import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@contexts/AuthContext";

import getCoverUrl from "@lib/getCoverUrl";
import { writeGameInTheList } from "@lib/gamelist";

import useClickOutside from "hooks/useClickOutside";

import {
  CardContainer,
  CoverWrapper,
  Info,
  GameTitle,
  Platform,
  AddButton,
  StateButton,
  DropdownOptions,
  Dropdown,
  StateLabel,
} from "./GameCard.element";

//If you don't send the gamelist as prop, the game state will be
//taken from the authenticated user's game list.
interface GameCardProps {
  game: Game;
  gamelist?: ListedGame[];
  isGamelistMode?: boolean;
}

function GameCard({ game, gamelist, isGamelistMode = false }: GameCardProps) {
  const DROPDOWN_OPTIONS: Array<GameState> = [
    "playing",
    "played",
    "dropped",
    "wishlist",
  ];

  const [user] = useAuth();

  const [gameState, setGameState] = useState<GameState>();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownNode = useClickOutside<HTMLUListElement>(() =>
    setIsDropdownOpen(false)
  );

  const coverUrl = getCoverUrl(game.cover);

  const getFormattedPlatforms = (platforms: Platform[]) => {
    if (!platforms) return "";

    const platformsAbbreviation = platforms.map((platform) => {
      return platform.abbreviation;
    });

    return platformsAbbreviation.join(", ");
  };

  const handleAddToList = async (state: GameState) => {
    const listedGame = { game_id: game.id, state: state };

    user && (await writeGameInTheList(listedGame, user.id));
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
      <Link href={`/game/${game.id}`} passHref>
        <CoverWrapper>
          <Image src={coverUrl} layout="fill" />
        </CoverWrapper>
      </Link>

      <Info>
        <Link href={`/game/${game.id}`} passHref>
          <GameTitle>{game.name}</GameTitle>
        </Link>
        <Platform>{getFormattedPlatforms(game.platforms)}</Platform>

        {isGamelistMode ? (
          <StateLabel>{gameState}</StateLabel>
        ) : gameState ? (
          <StateButton onClick={() => setIsDropdownOpen(true)}>
            <span>{gameState}</span>
            <span className="material-icons-round">arrow_drop_down</span>
          </StateButton>
        ) : (
          <AddButton onClick={async () => await handleAddToList("playing")}>
            + Add to List
          </AddButton>
        )}

        <Dropdown ref={dropdownNode} isOpen={isDropdownOpen}>
          {DROPDOWN_OPTIONS.map((state, index) => {
            return (
              <DropdownOptions
                key={index}
                onClick={() => {
                  handleAddToList(state);
                  setIsDropdownOpen(false);
                }}
              >
                {state}
              </DropdownOptions>
            );
          })}
        </Dropdown>
      </Info>
    </CardContainer>
  );
}

export default GameCard;
