// Styles
import { useParams } from "react-router-dom";
import styles from "./Book.module.css";
import { useTheme } from "../../hooks/useTheme";
import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/config";

const createBookObj = (data, id) => {
  return {
    id: id,
    title: data.title,
    description: data.description,
    publisher: data.publisher,
    imageUrl: data.imageUrl,
    details: [
      { Author: data.details[0] },
      { "EAN/UPC": data.details[1] },
      { Pages: data.details[2] },
      { Cover: data.details[3] },
    ],
  };
};

export const Book = () => {
  const { id } = useParams();
  const { mode } = useTheme();

  const [book, setBook] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("BooksBestSellers")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setBook(createBookObj(doc.data()));
        } else {
          setIsPending(false);
          setError("Could not find book");
        }
      });
  }, [id]);

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
