import Image from "next/image";
import Link from "next/link";

import getCoverUrl from "@lib/getCoverUrl";

import {
  CardContainer,
  CoverWrapper,
  Info,
  GameTitle,
  Platform,
  AddButton,
} from "./GameCard.element";

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  const coverUrl = getCoverUrl(game.cover);

  const getFormattedPlatforms = (platforms: Platform[]) => {
    const platformsAbbreviation = platforms.map((platform) => {
      return platform.abbreviation;
    });

    return platformsAbbreviation.join(", ");
  };

  return (
    <CardContainer>
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
        <AddButton>+ Add to List</AddButton>
      </Info>
    </CardContainer>
  );
}

export default GameCard;
