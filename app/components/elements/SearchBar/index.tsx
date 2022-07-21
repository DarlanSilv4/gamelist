import { InputBar, SearchContainer, SearchIcon } from "./SearchBar.element";

function SearchBar() {
  return (
    <SearchContainer>
      <InputBar type="text" placeholder="Search game titles..." />
      <SearchIcon className="material-icons-round">search</SearchIcon>
    </SearchContainer>
  );
}

export default SearchBar;
