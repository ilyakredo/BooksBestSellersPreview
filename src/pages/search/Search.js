import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { BooksList } from "../../components/BooksList";

export const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const searchUrl = `http://localhost:3000/books?q=${query}`;
  const { data, isPending, error } = useFetch(searchUrl);

  return (
    <div>
      <h2 className="page-title">Books found for - "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <BooksList books={data} />}
    </div>
  );
};
