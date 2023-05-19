import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styles
import "./App.css";

// Page components
import { Search } from "./pages/search/Search";
import { Home } from "./pages/home/Home";
import { CreateItem } from "./pages/createItem/CreateItem";
import { Book } from "./pages/book/Book";
import { NavBar } from "./components/NavBar";
import { ThemeSelecter } from "./components/ThemeSelecter";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <NavBar />
        <ThemeSelecter />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
