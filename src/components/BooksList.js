// Styles
import { Link } from "react-router-dom";
import styles from "./BooksList.module.css";
import { useTheme } from "../hooks/useTheme";

export const BooksList = ({ books }) => {
  const { mode } = useTheme();

  if (books.length === 0) {
    return <div className="error">No books were found...</div>;
  }

  return (
    <div className={styles.booksList}>
      {books.map((book) => (
        <div key={book.id} className={`${styles.card} ${styles[mode]}`}>
          <h3>{book.title}</h3>
          <p>{book.publisher}</p>
          <div>{book.description.substring(0, 100)}...</div>
          <Link to={`/books/${book.id}`}>Show information</Link>
        </div>
      ))}
    </div>
  );
};
