import { database } from "@firebase/firebaseConfig";
import { child, get, ref, set, update } from "firebase/database";

async function updateName(user: User, name: string) {
  const { id, name: currentName } = user;

  if (name !== currentName) {
    await set(ref(database, `users/${id}/name`), name);
  }
}

async function updateUsername(user: User, username: string) {
  const { id, username: currentUsername } = user;

  if (username === currentUsername) return;

  const updates: any = {};
  updates[`users/${id}/username/`] = username;
  updates[`usernames/${username}`] = id;

  await update(ref(database), updates);
  if (currentUsername) await removeUsername(currentUsername);
}

async function removeUsername(username: string) {
  const usernameRef = ref(database, `usernames/${username}/`);
  await set(usernameRef, null);
}

async function checkUsername(username: string) {
  const snapshot = await get(child(ref(database), `usernames/${username}`));
  if (snapshot.exists()) {
    return true;
  }
  return false;
}

async function updateSummary(user: User, summary: string) {
  const { id, profile_summary: currentSummary } = user;

  if (summary !== currentSummary) {
    await set(ref(database, `users/${id}/profile_summary`), summary);
  }
}

export { updateName, updateUsername, updateSummary, checkUsername };
