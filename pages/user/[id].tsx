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
  const TEEN_MINUTES = 2 * 60; //in seconds

  const snapshot = await get(child(ref(database), `users/${id}`));

  if (!snapshot.exists()) return { notFound: true };

  const user = snapshot.toJSON() as User;

  return {
    props: {
      user: user,
    },
    revalidate: TEEN_MINUTES,
  };
}
