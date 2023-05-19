import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";

// Styles
import styles from "./ThemeSelecter.module.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

export const ThemeSelecter = () => {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div className={styles.themeSelector}>
      <div className={styles.modeToggle}>
        <img
          src={modeIcon}
          alt="Theme icon"
          onClick={toggleMode}
          style={{ filter: mode === "light" ? "invert(20%)" : "invert(100%)" }}
        />
      </div>
      <div className={styles.themeButtons}>
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};
