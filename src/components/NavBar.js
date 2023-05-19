import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// Styles
import styles from "./NavBar.module.css";

// Components
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
  const { color } = useTheme();
  return (
    <div className={styles.navbar} style={{ background: color }}>
      <nav>
        <Link className={styles.brand} to="/">
          <h1>Latest books best sellers</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Add book</Link>
      </nav>
    </div>
  );
};
