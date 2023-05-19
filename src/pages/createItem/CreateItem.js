import { useEffect, useState } from "react";
import { BookDetails } from "../../components/BookDetails";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

// Styles
import styles from "./CreateItem.module.css";

export const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [detailOption, setDetailOption] = useState("Author");
  const [details, setDetails] = useState([]);
  const [detailValue, setDetailValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { mode } = useTheme();

  const { postData, data, error } = useFetch(
    "http://localhost:3000/books",
    "POST"
  );

  const handleBookAdding = (event) => {
    event.preventDefault();
    postData({
      title,
      description,
      publisher,
      imageUrl,
      details,
    });
  };

  // redirect user when we get data response
  useEffect(() => {
    if (data) {
      navigate("/");
    }
    if (error) {
      setErrorMsg(error);
    }
  }, [data, navigate, error]);

  const addDetailItem = (event) => {
    event.preventDefault();
    const detailKey = detailOption;
    if (detailValue) {
      const bookDetail = {};
      bookDetail[detailKey] = detailValue;
      setDetails((prevValue) => {
        if (prevValue.length > 0) {
          if (
            prevValue.find((detail) => Object.keys(detail)[0] === detailKey)
          ) {
            return prevValue.map((detail) => {
              if (Object.keys(detail)[0] === detailKey) {
                return bookDetail;
              } else {
                return detail;
              }
            });
          } else {
            return [...prevValue, bookDetail];
          }
        } else {
          return [bookDetail];
        }
      });
    }
    setDetailValue("");
  };

  return (
    <div className={`${styles.create} ${styles[mode]}`}>
      <h2 className={styles.pageTitle}>Add new best seller book</h2>
      <form onSubmit={handleBookAdding}>
        <label>
          <span>Book title: </span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Book publisher: </span>
          <input
            type="text"
            onChange={(e) => setPublisher(e.target.value)}
            value={publisher}
            required
          />
        </label>
        <label>
          <span>Book details: </span>
          <div className={styles.detailsWrapper}>
            <select
              onChange={(e) => setDetailOption(e.target.value)}
              name="bookOptions"
            >
              <option value="Author">Author</option>
              <option value="EAN/UPC">EAN/UPC</option>
              <option value="Pages">Pages</option>
              <option value="Cover">Cover</option>
            </select>
            <input
              type="text"
              onChange={(e) => setDetailValue(e.target.value)}
              value={detailValue}
              placeholder="Enter value"
            />
            <button onClick={addDetailItem} className={styles.btn}>
              Add
            </button>
          </div>
          {details.length > 0 && <BookDetails details={details} />}
        </label>
        <label>
          <span>Book description: </span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>
        <label>
          <span>Book image URL: </span>
          <input
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            required
            placeholder="https://www..."
          />
        </label>
        {errorMsg && (
          <div className={styles.errorMsg}>Error adding book - {errorMsg}</div>
        )}
        <button className={styles.btn}>Add book</button>
      </form>
    </div>
  );
};
