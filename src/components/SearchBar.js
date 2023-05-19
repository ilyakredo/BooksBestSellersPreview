// Styles
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setTerm("");
    navigate(`/search?q=${term}`);
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
        />
      </form>
    </div>
  );
};
