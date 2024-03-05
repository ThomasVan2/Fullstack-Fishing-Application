import React from "react";

// Define the props that SearchBar expects
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

// The SearchBar functional component
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  // Prevent the default form submit behavior
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        className="form-control me-3"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
