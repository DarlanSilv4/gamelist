import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "@contexts/AuthContext";

import getCoverUrl from "@lib/getCoverUrl";

import AddtoListButton from "@elements/AddToListButton";
import GameCard from "@elements/GameCard";
import Head from "@elements/Head";

import Default from "@layouts/Default";

import {
  Banner,
  CoverWrapper,
  Container,
  Description,
  Details,
  GameTitle,
  Header,
  Main,
  Nav,
  NavOption,
  NoScroll,
  Overlay,
  Overview,
  GamesContainer,
  ScoreContainer,
  Score,
  WebsiteIcon,
  Website,
  WebsitesContainer,
  ViewAllButton,
  ContainerHeader,
  Video,
} from "./Game.element";

interface Query {
  slug?: string;
  page?: string;
}

function Game({ game }: { game: Game }) {
  const [user] = useAuth();

  const router = useRouter();
  const { query }: { query: Query } = router;
  const page = query.page?.toLowerCase() || "";

  const MONTHS_NAME = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const CATEGORIES = [
    "Main Game",
    "Dlc",
    "Expansion",
    "Bundle",
    "Stand-Alone Expansion",
    "Mod",
    "Episode",
    "Season",
    "Remake",
    "Remaster",
    "Expanded Game",
    "Port",
    "Fork",
  ];

  const WEBSITES = {
    1: {
      icon: "/svg/external_link_icon.svg",
      name: "Site Official",
    },
    9: {
      icon: "/svg/youtube_logo.svg",
      name: "Youtube",
    },
    13: {
      icon: "/svg/steam_logo.svg",
      name: "Steam",
    },
    16: {
      icon: "/svg/epicgames_logo.svg",
      name: "Epic Games",
    },
    17: {
      icon: "/svg/gog_logo.svg",
      name: "GOG",
    },
  };

  const [isDlcsOpen, setDlcsOpen] = useState(false);
  const [isRelationsOpen, setRelationsOpen] = useState(false);
  const [isRecommedationsOpen, setRecommendationOpen] = useState(false);
  const [gameState, setGameState] = useState<GameState>();

  const timestampInMillisecond = game.first_release_date * 1000;
  const firstReleaseDate = new Date(timestampInMillisecond);
  const firstReleaseMonth = MONTHS_NAME[firstReleaseDate.getMonth()];

  useEffect(() => {
    if (!user || !user.gamelist) return;

    const listedGame = Object.values(user.gamelist).find(
      (listedGame) => listedGame.game_id == game.id
    );

    setGameState(listedGame?.state);
  }, [user]);

  const getDlcs = () => {
    const { dlcs, expansions } = game;

    const DlcsAndExpansions: Game[] = [];
    dlcs && DlcsAndExpansions.push(...dlcs);
    expansions && DlcsAndExpansions.push(...expansions);

    if (DlcsAndExpansions.length > 0) {
      return DlcsAndExpansions;
    }

    return [];
  };

  const getBanner = () => {
    const { screenshots } = game;
    if (screenshots && screenshots.length > 0) {
      return `https://images.igdb.com/igdb/image/upload/t_720p/${screenshots[0].image_id}.jpg`;
    }

    return "";
  };

  const getDevelopers = () => {
    const developers = game.involved_companies?.filter((involvedCompany) => {
      return involvedCompany.developer;
    });

    return (
      developers
        ?.map((developer) => {
          return developer.company.name;
        })
        .join(", ") || "--"
    );
  };

  const getPublishers = () => {
    const publishers = game.involved_companies?.filter((involvedCompany) => {
      return involvedCompany.publisher;
    });

    return (
      publishers
        ?.map((publisher) => {
          return publisher.company.name;
        })
        .join(", ") || "--"
    );
  };

  const getWebsites = () => {
    const websiteKeys = Object.keys(WEBSITES);

    const websites = game.websites?.filter((website) => {
      return websiteKeys.includes(String(website.category));
    });

    if (!websites || websites.length < 0) {
      return "--";
    }

    return (
      websites?.map((website, id) => {
        const name = WEBSITES[website.category as keyof typeof WEBSITES].name;
        const icon = WEBSITES[website.category as keyof typeof WEBSITES].icon;

        return (
          <Website key={id} href={website.url}>
            <WebsiteIcon>
              <Image src={icon} layout="fill" />
            </WebsiteIcon>
            <span>{name}</span>
          </Website>
        );
      }) || <div />
    );
  };

  const createGamesShowcase = (
    title: string,
    games: Game[],
    isOpen: boolean,
    setOpen: Function
  ) => {
    return (
      <Container>
        <ContainerHeader>
          <h2>{title}</h2>
          {games.length > 4 && (
            <ViewAllButton onClick={() => setOpen(!isOpen)}>
              <span className="material-icons-round">
                {isOpen ? "expand_less" : "expand_more"}
              </span>
              <span>{isOpen ? "View Less" : "View All"}</span>
            </ViewAllButton>
          )}
        </ContainerHeader>
        <GamesContainer isOpen={isOpen}>
          {games.map((game, index) => {
            return <GameCard key={index} game={game} />;
          })}
        </GamesContainer>
      </Container>
    );
  };

  return (
    <React.Fragment>
      <Head title="Gamelist" />
      <Default>
        <div>
          <Banner src={getBanner()}>
            <Overlay />
          </Banner>
          <Header>
            <CoverWrapper>
              <Image src={getCoverUrl(game.cover)} layout="fill" />
            </CoverWrapper>
            <GameTitle>{game.name}</GameTitle>
            <AddtoListButton currentState={gameState} gameId={game.id} />
            <p>
              {game.summary ||
                "There is currently no information about this game."}
            </p>
          </Header>

          <Nav>
            <Link href={`${query.slug}`}>
              <NavOption isActive={page !== "details"}>Overview</NavOption>
            </Link>
            <Link href={`${query.slug}?page=details`}>
              <NavOption isActive={page === "details"}>Details</NavOption>
            </Link>
          </Nav>

          <NoScroll>
            <Main page={page}>
              <Overview>
                <Container>
                  <h2>Description</h2>
                  <Description>{game.summary}</Description>
                </Container>

                {game.videos && game.videos.length > 0 && (
                  <Container>
                    <h2>Trailer</h2>
                    <Video
                      src={`https://www.youtube.com/embed/${game.videos[0].video_id}`}
                      title="Game Trailer"
                    ></Video>
                  </Container>
                )}

                {(game.dlcs || game.expansions) &&
                  createGamesShowcase(
                    "DLCs",
                    getDlcs(),
                    isDlcsOpen,
                    setDlcsOpen
                  )}

                {game.collection &&
                  createGamesShowcase(
                    "Relations",
                    game.collection.games,
                    isRelationsOpen,
                    setRelationsOpen
                  )}

                {game.similar_games &&
                  createGamesShowcase(
                    "Recommendations",
                    game.similar_games,
                    isRecommedationsOpen,
                    setRecommendationOpen
                  )}
              </Overview>

              <Details>
                <ScoreContainer>
                  <h2>Score</h2>
                  <Score score={game.aggregated_rating}>
                    {game.aggregated_rating?.toFixed(0) || "--"}
                  </Score>
                  <span>Rating based on external critic scores</span>
                </ScoreContainer>

                <div>
                  <h2>Alternative Names</h2>
                  <span>
                    {game.alternative_names
                      ?.map((alterName) => {
                        return alterName.name;
                      })
                      .join(", ") || "--"}
                  </span>
                </div>

                <div>
                  <h2>Category</h2>
                  <span>
                    {game.category != null ? CATEGORIES[game.category] : "--"}
                  </span>
                </div>

                <div>
                  <h2>First Release Date</h2>
                  <span>{`${firstReleaseMonth} ${firstReleaseDate.getDate()}, ${firstReleaseDate.getFullYear()}`}</span>
                </div>

                <div>
                  <h2>Game Mode(s)</h2>
                  <span>
                    {game.game_modes
                      ?.map((mode) => {
                        return mode.name;
                      })
                      .join(", ") || "--"}
                  </span>
                </div>

                <div>
                  <h2>Genres</h2>
                  <span>
                    {game.genres
                      ?.map((genre) => {
                        return genre.name;
                      })
                      .join(", ")}
                  </span>
                </div>

                <div>
                  <h2>Platform(s)</h2>
                  <span>
                    {game.platforms
                      ?.map((platform) => platform.name)
                      .join(" · ") || "--"}
                  </span>
                </div>

                <div>
                  <h2>Developer(s)</h2>
                  <span>{getDevelopers()}</span>
                </div>

                <div>
                  <h2>Publisher(s)</h2>
                  <span>{getPublishers()}</span>
                </div>

                <div>
                  <h2>Website(s)</h2>
                  <WebsitesContainer>{getWebsites()}</WebsitesContainer>
                </div>
              </Details>
            </Main>
          </NoScroll>
        </div>
      </Default>
    </React.Fragment>
  );
}

export default Game;
