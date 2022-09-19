import { useState } from "react";

import { useRouter } from "next/router";

import { InputBar, SearchContainer, SearchIcon } from "./SearchBar.element";

interface SearchBarProps {
  value?: string;
  focus?: boolean;
}

function SearchBar({ value = "", focus = false }: SearchBarProps) {
  const router = useRouter();

  const [searchText, setSearchText] = useState(value);
  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout>();

  const isTextEmpty = (text: string) => !Boolean(text);

  const handlerSearch = (title: string) => {
    setSearchText(title);

    if (isTextEmpty(title) && router.asPath !== "/") {
      clearTimeout(searchDebounce);
      return router.push("/");
    }

    const debounce = setTimeout(() => {
      router.push(`/search?title=${title}`);
    }, 500);

    clearTimeout(searchDebounce);
    setSearchDebounce(debounce);
  };

  const setFocus = (input: HTMLInputElement | null) => {
    focus && input && input.focus();
  };

  return (
    <SearchContainer>
      <InputBar
        type="text"
        placeholder="Search game titles..."
        value={searchText}
        onChange={({ target }) => handlerSearch(target.value)}
        ref={(input) => setFocus(input)}
      />
      <SearchIcon className="material-icons-round">search</SearchIcon>
    </SearchContainer>
  );
}

export default SearchBar;
