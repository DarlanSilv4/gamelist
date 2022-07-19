import React, { useEffect, useState } from "react";

import { auth } from "@firebase/firebaseConfig";

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

  return (
    <AuthContext.Provider value={[user, isLoading]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext) as AuthContextType;

export default AuthProvider;
