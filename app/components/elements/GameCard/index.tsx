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
} from "./GameCard.element";

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
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
    if (platforms) {
      const platformsAbbreviation = platforms.map((platform) => {
        return platform.abbreviation;
      });

      return platformsAbbreviation.join(", ");
    }

    return "";
  };

  const handleAddToList = async (state: GameState) => {
    if (!user) return;

    await writeGameInTheList({ game_id: game.id, state: state }, user.id);
  };

  useEffect(() => {
    const getGameState = () => {
      if (!user || !user.gamelist) return;

      const listedGame = user.gamelist.find(
        (listedGame) => listedGame.game_id == game.id
      );

      if (listedGame) setGameState(listedGame.state);
    };

    getGameState();
  }, [user]);

  return (
    <CardContainer state={gameState}>
      <Link href={`game/${game.id}`} passHref>
        <CoverWrapper>
          <Image src={coverUrl} layout="fill" />
        </CoverWrapper>
      </Link>

      <Info>
        <Link href={`game/${game.id}`} passHref>
          <GameTitle>{game.name}</GameTitle>
        </Link>
        <Platform>{getFormattedPlatforms(game.platforms)}</Platform>

        {gameState ? (
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
          {DROPDOWN_OPTIONS.map((state) => {
            return (
              <DropdownOptions
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
