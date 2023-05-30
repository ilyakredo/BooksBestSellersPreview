import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { useTheme } from "../hooks/useTheme";
import Trashcan from "../assets/trashcan.svg";

// Styles
import styles from "./BooksList.module.css";

export const BooksList = ({ books }) => {
  const { mode } = useTheme();

  if (books.length === 0) {
    return <div className="error">No books were found...</div>;
  }

  const handleDelete = (id) => {
    projectFirestore.collection("BooksBestSellers").doc(id).delete();
  };

  return (
    <div className={styles.booksList}>
      {books.map((book) => (
        <div key={book.id} className={`${styles.card} ${styles[mode]}`}>
          <h3>{book.title}</h3>
          <p>{book.publisher}</p>
          <div>{book.description.substring(0, 100)}...</div>
          <Link to={`/books/${book.id}`}>Show information</Link>
          <img
            src={Trashcan}
            alt="Delete icon"
            className={styles.delete}
            onClick={() => handleDelete(book.id)}
          />
        </div>
      ))}
    </div>
  );
};
