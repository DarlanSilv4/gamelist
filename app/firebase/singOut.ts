import { auth } from "@firebase/firebaseConfig";

async function signOut() {
  return auth.signOut();
}

export default signOut;
