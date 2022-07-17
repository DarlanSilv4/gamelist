import GameCard from "@elements/GameCard";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContainer,
  DirectionButton,
  Footer,
  GameGroup,
  Header,
  ProgressBar,
  ProgressItem,
  Title,
} from "./GamesCarousel.element";

type DirectionType = "next" | "back";

interface GamesCarroselProps {
  title: string;
  games: Game[];
}

function GamesCarousel({ games, title }: GamesCarroselProps) {
  const totalCard = games.length;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const gameGroup = useRef(null);

  const handleDirectionButton = (direction: DirectionType) => {
    return direction == "next"
      ? setCarouselIndex((i) => i + 1)
      : setCarouselIndex((i) => i - 1);
  };

  useEffect(() => {
    const getTotalPages = () => {
      const element = gameGroup.current;

      if (element) {
        const compStyles = getComputedStyle(element);

        const itemsPerScreen =
          compStyles.getPropertyValue("--items-per-screen");

        const totalPages = totalCard / parseInt(itemsPerScreen);

        setTotalPages(totalPages);
      }
    };

    return getTotalPages();
  }, [gameGroup]);

  useEffect(() => {
    const infiniteScroll = () => {
      if (carouselIndex >= totalPages) return setCarouselIndex(0);
      if (carouselIndex < 0) return setCarouselIndex(totalPages - 1);
    };

    return infiniteScroll();
  }, [carouselIndex, totalPages]);

  const createProgressItem = () => {
    return [...Array(totalPages)].map((_, index) => {
      return (
        <ProgressItem
          key={index}
          isActive={carouselIndex === index}
          onClick={() => {
            setCarouselIndex(index);
          }}
        />
      );
    });
  };

  return (
    <CarouselContainer>
      <Header>
        <Title>{title}</Title>
        <div>
          <DirectionButton onClick={() => handleDirectionButton("back")}>
            &#10094;
          </DirectionButton>
          <DirectionButton onClick={() => handleDirectionButton("next")}>
            &#10095;
          </DirectionButton>
        </div>
      </Header>
      <Carousel>
        <GameGroup ref={gameGroup} index={carouselIndex}>
          {games.map((game, index) => {
            return <GameCard key={index} game={game} />;
          })}
        </GameGroup>
      </Carousel>
      <Footer>
        <ProgressBar>{createProgressItem()}</ProgressBar>
      </Footer>
    </CarouselContainer>
  );
}

export default GamesCarousel;
