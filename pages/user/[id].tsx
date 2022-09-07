import React from "react";

import { child, get, ref } from "firebase/database";

import { database } from "@firebase/firebaseConfig";

import ProfilePage from "@templates/Profile";

import getGames from "@lib/getGames";

function Profile({ user, userGames }: { user: User; userGames: Game[] }) {
  return <ProfilePage user={user} games={userGames} />;
}

export default Profile;

interface StaticProps {
  params: {
    id: string;
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }: StaticProps) {
  const snapshot = await get(child(ref(database), `users/${id}`));

  if (!snapshot.exists()) return { notFound: true };

  const user = snapshot.toJSON() as User;

  //Firebase does not accept arrays, so it covert array in object.
  //This code covert the object back to array
  const userGamelist = user.gamelist
    ? Object.values(user.gamelist).map((value: ListedGame) => {
        return { game_id: value.game_id, state: value.state };
      })
    : [];

  const userGamesIds: string[] = [];

  if (userGamelist) {
    const gamesIds = Object.values(userGamelist).map((value: ListedGame) => {
      return value.game_id;
    });

    userGamesIds.push(...gamesIds);
  }

  const userGamesIdsConcatened = userGamesIds.join();
  const query = `fields name, platforms.name, platforms.abbreviation, cover.image_id; sort name asc; limit 50; where id = (${userGamesIdsConcatened});`;
  const userGames = await getGames(query);

  const userWithGamelistInArrayFormat = { ...user, gamelist: userGamelist };

  return {
    props: {
      user: userWithGamelistInArrayFormat,
      userGames,
    },
  };
}
