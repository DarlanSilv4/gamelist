import React from "react";

import { child, get, ref } from "firebase/database";

import { database } from "@firebase/firebaseConfig";

import ProfilePage from "@templates/Profile";

function Profile({ user }: { user: User }) {
  return <ProfilePage user={user} />;
}

export default Profile;

interface StaticProps {
  params: {
    username: string;
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { username } }: StaticProps) {
  const TEEN_MINUTES = 10 * 60; //in seconds

  const usernameSnapshot = await get(
    child(ref(database), `usernames/${username}`)
  );

  if (!usernameSnapshot.exists()) return { notFound: true };

  const userId = String(usernameSnapshot.val());

  const userSnapshot = await get(child(ref(database), `users/${userId}`));
  const user = userSnapshot.toJSON() as User;

  return {
    props: {
      user: user,
    },
    revalidate: TEEN_MINUTES,
  };
}
