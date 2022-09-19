import { useState } from "react";

import { useRouter } from "next/router";

import { InputBar, SearchContainer, SearchIcon } from "./SearchBar.element";

function SearchBar({ value = "" }: { value?: string }) {
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

  return (
    <SearchContainer>
      <InputBar
        type="text"
        placeholder="Search game titles..."
        value={searchText}
        onChange={({ target }) => handlerSearch(target.value)}
      />
      <SearchIcon className="material-icons-round">search</SearchIcon>
    </SearchContainer>
  );
}

export default SearchBar;
