import { database } from "@firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";

function getGamelist(
  userId: string,
  setGamelist: React.Dispatch<React.SetStateAction<ListedGame[]>>
) {
  const gamelistRef = ref(database, `users/${userId}/gamelist`);

  onValue(gamelistRef, (snapshot) => {
    const data: ListedGame | {} = snapshot.val() ?? {};

    const gamelist = Object.values(data).map((value: ListedGame) => {
      return {
        game_id: value.game_id,
        state: value.state,
      };
    });

    setGamelist(gamelist);
  });
}

export { getGamelist };
