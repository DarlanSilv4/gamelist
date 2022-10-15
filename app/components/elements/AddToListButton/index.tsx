import React, { useState } from "react";

import { useRouter } from "next/router";

import { useAuth } from "@contexts/AuthContext";

import { RemoveGameFromTheList, writeGameInTheList } from "@lib/gamelist";

import useClickOutside from "hooks/useClickOutside";

import {
  AddButton,
  StateButton,
  DropdownOptions,
  Dropdown,
  StateLabel,
  DropdownRemoveOption,
} from "./AddToListButton.element";

interface ButtonProps {
  currentState?: GameState;
  gameId: string;
  isGamelistMode?: boolean;
  isDeleteEnable?: boolean;
}

function AddtoListButton({
  currentState,
  gameId,
  isGamelistMode = false,
}: ButtonProps) {
  const DROPDOWN_OPTIONS: Array<GameState> = [
    "playing",
    "played",
    "dropped",
    "wishlist",
  ];

  const [user] = useAuth();

  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownNode = useClickOutside<HTMLUListElement>(() =>
    setIsDropdownOpen(false)
  );

  const handleAddToList = async (state: GameState) => {
    const listedGame = { game_id: gameId, state: state };

    user
      ? await writeGameInTheList(listedGame, user.id)
      : router.push("/login");
  };

  const handleRemoveFromList = async () => {
    user && (await RemoveGameFromTheList(gameId, user.id));
  };

  return (
    <React.Fragment>
      {isGamelistMode ? (
        <StateLabel>{currentState}</StateLabel>
      ) : currentState ? (
        <StateButton
          state={currentState}
          onClick={() => setIsDropdownOpen(true)}
        >
          <span>{currentState}</span>
          <span className="material-icons-round">arrow_drop_down</span>
        </StateButton>
      ) : (
        <AddButton onClick={async () => await handleAddToList("playing")}>
          + Add to List
        </AddButton>
      )}
      <Dropdown ref={dropdownNode} isOpen={isDropdownOpen}>
        {DROPDOWN_OPTIONS.map((state, index) => {
          return (
            <DropdownOptions
              key={index}
              onClick={() => {
                handleAddToList(state);
                setIsDropdownOpen(false);
              }}
            >
              {state}
            </DropdownOptions>
          );
        })}

        <DropdownRemoveOption
          onClick={() => {
            handleRemoveFromList();
            setIsDropdownOpen(false);
          }}
        >
          Remove
        </DropdownRemoveOption>
      </Dropdown>
    </React.Fragment>
  );
}

export default AddtoListButton;
