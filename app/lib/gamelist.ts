import { database } from "@firebase/firebaseConfig";
import { ref, set } from "firebase/database";

async function writeGameInTheList(game: ListedGame, userId: string) {
  const gamelistRef = ref(database, `users/${userId}/gamelist/${game.game_id}`);
  await set(gamelistRef, game);
}

async function RemoveGameFromTheList(gameId: string, userId: string) {
  const gamelistRef = ref(database, `users/${userId}/gamelist/${gameId}`);
  await set(gamelistRef, null);
}

export { writeGameInTheList, RemoveGameFromTheList };
