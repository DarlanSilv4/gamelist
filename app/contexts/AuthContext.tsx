import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { auth, database } from "@firebase/firebaseConfig";
import { child, get, ref, set, onValue } from "firebase/database";

type AuthContextType = [User | null, boolean];

export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthProvider(props: React.PropsWithChildren<{}>) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { uid, displayName, photoURL } = user;
      const userRef = ref(database, `users/${uid}`);

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.toJSON() as User;
          setUser(user);
        } else {
          setUser({
            id: uid,
            name: displayName || `user - ${uid}`,
            avatar: photoURL,
          });
        }

        setIsLoading(false);
      });
    });

    return () => {
      getUser();
    };
  }, [auth]);

  useEffect(() => {
    const writeUserData = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const { displayName, photoURL, uid } = user;

      const snapshot = await get(child(ref(database), `users/${uid}`));

      if (snapshot.exists()) return;

      set(ref(database, `users/${user.uid}`), {
        id: user.uid,
        name: displayName,
        avatar: photoURL,
      });
    });

    return () => {
      writeUserData();
    };
  }, [auth]);

  useEffect(() => {
    const EDIT_PROFILE_PATH = "/edit-profile";

    const sendToEditProfileInCaseUserDoesntHaveUsername = () => {
      if (user && !user.username && router.asPath !== EDIT_PROFILE_PATH) {
        router.push(EDIT_PROFILE_PATH);
      }
    };

    sendToEditProfileInCaseUserDoesntHaveUsername();
  });

  return (
    <AuthContext.Provider value={[user, isLoading]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext) as AuthContextType;

export default AuthProvider;
