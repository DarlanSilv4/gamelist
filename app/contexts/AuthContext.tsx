import React, { useEffect, useState } from "react";

import { auth } from "@lib/firebaseConfig";

type AuthContextType = {
  user: User | null;
  signOut: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        setUser({
          id: uid,
          name: displayName || `user - ${uid}`,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext) as AuthContextType;

export default AuthProvider;
