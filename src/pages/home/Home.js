// import { useFetch } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";

// Styles
import styles from "./Home.module.css";

// Components
import { BooksList } from "../../components/BooksList";

export const Home = () => {
  const [books, setBooks] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    const unsubscribe = projectFirestore
      .collection("BooksBestSellers")
      .onSnapshot(
        (snapshoot) => {
          if (snapshoot.empty) {
            setError("No books to load");
            setIsPending(false);
          } else {
            const results = [];
            snapshoot.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() });
            });
            setBooks(results);
            setIsPending(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.home}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {books && <BooksList books={books} />}
    </div>
  );
};
