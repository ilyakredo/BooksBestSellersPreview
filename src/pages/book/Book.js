// Styles
import { useParams } from "react-router-dom";
import styles from "./Book.module.css";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

export const Book = () => {
  const { id } = useParams();
  const FETCH_URL = `http://localhost:3000/books/${id}`;
  const { data: book, isPending, error } = useFetch(FETCH_URL);
  const { mode } = useTheme();

  return (
    <div className={`${styles.book} ${styles[mode]}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {book && (
        <>
          <h2 className={`page-title ${styles[mode]}`}>{book.title}</h2>
          <div className={styles.contentWrapper}>
            <img src={`${book.imageUrl}`} alt="Book cover" />
            <div className={styles.infoWrapper}>
              <p>{book.publisher}</p>
              <ul>
                {book.details.map((detail, ind) => {
                  const key = Object.keys(detail);
                  return (
                    <li key={ind}>
                      <span className={styles.descKey}>{`${key}:`}</span>
                      {`${detail[key]}`}
                    </li>
                  );
                })}
              </ul>
              <p className={styles.description}>{book.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
