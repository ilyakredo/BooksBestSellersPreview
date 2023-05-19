// Styles
import styles from "./BookDetails.module.css";

export const BookDetails = ({ details }) => {
  return (
    <div className={styles.bookDetails}>
      {details.map((detail, ind) => {
        const key = Object.keys(detail)[0];
        return <p key={key}>{`${key}: ${detail[key]}`}</p>;
      })}
    </div>
  );
};
