import { useEffect } from "react";

import { useRouter } from "next/router";

import { useAuth } from "@contexts/AuthContext";
import Login from "@templates/Login";

function LoginPage() {
  const [user] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return <Login />;
}

export default LoginPage;
