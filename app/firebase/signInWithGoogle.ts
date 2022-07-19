import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

import { auth } from "@firebase/firebaseConfig";

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  await signInWithRedirect(auth, provider);

  return await getRedirectResult(auth);
}

export default signInWithGoogle;
