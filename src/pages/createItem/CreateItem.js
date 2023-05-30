import { useState } from "react";
import { projectFirestore } from "../../firebase/config";
import { BookDetails } from "../../components/BookDetails";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

// Styles
import styles from "./CreateItem.module.css";

const createDetailsArr = (detailsObjArr) => {
  const detailsArr = [];
  detailsObjArr.forEach((detail) => {
    if (Object.keys(detail)[0] === "Author") {
      detailsArr[0] = detail["Author"];
    }
    if (Object.keys(detail)[0] === "EAN/UPC") {
      detailsArr[1] = detail["EAN/UPC"];
    }
    if (Object.keys(detail)[0] === "Pages") {
      detailsArr[2] = detail["Pages"];
    }
    if (Object.keys(detail)[0] === "Cover") {
      detailsArr[3] = detail["Cover"];
    }
  });
  return detailsArr;
};

export const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [detailOption, setDetailOption] = useState("Author");
  const [bookDetails, setBookDetails] = useState([]);
  const [detailValue, setDetailValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { mode } = useTheme();

  const handleBookAdding = async (event) => {
    event.preventDefault();
    const details = createDetailsArr(bookDetails);
    const newBook = { title, description, publisher, imageUrl, details };
    try {
      await projectFirestore.collection("BooksBestSellers").add(newBook);
      // redirect user when we get data response
      navigate("/");
    } catch (err) {
      setErrorMsg("Faild to add new book");
      console.log(err);
    }
  };

  const addDetailItem = (event) => {
    event.preventDefault();
    const detailsArr = bookDetails;
    if (detailValue) {
      const detailInd = detailsArr.findIndex(
        (detail) => Object.keys(detail)[0] === detailOption
      );
      if (detailInd >= 0) {
        detailsArr[detailInd][`${detailOption}`] = detailValue;
      } else {
        detailsArr.push({ [`${detailOption}`]: detailValue });
      }
      setBookDetails(detailsArr);
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
          {bookDetails.length > 0 && <BookDetails details={bookDetails} />}
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
