import { useFetch } from "../../hooks/useFetch";

// Styles
import styles from "./Home.module.css";

// Components
import { BooksList } from "../../components/BooksList";

const URL = "http://localhost:3000/books";

export const Home = () => {
  const { data: books, isPending, error } = useFetch(URL);
  return (
    <div className={styles.home}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {books && <BooksList books={books} />}
    </div>
  );
};
