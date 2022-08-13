import React, { useEffect, useState } from "react";

import { auth, database } from "@firebase/firebaseConfig";
import { child, get, ref, set } from "firebase/database";

type AuthContextType = [User | null, boolean];

export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        setUser({
          id: uid,
          name: displayName || `user - ${uid}`,
          avatar: photoURL,
        });
      }

      setIsLoading(false);
    });

    return () => {
      listener();
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

  return (
    <AuthContext.Provider value={[user, isLoading]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext) as AuthContextType;

export default AuthProvider;
