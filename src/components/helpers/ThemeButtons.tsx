import { type } from "os";
import { themes } from "../../constants";
 type Theme = {
  background: string;
};

export type ThemeButtonsProps = {
  handleThemeChange: (background: string) => void;
};

export const ThemeButtons: React.FC<ThemeButtonsProps> = ({
  handleThemeChange,
}: any) => {
  return (
    <div className="theme-btn-container">
      {themes.map((theme: Theme) => {
        const style = {
          background: theme.background,
          marginBottom: "5px",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          padding: "10px",
        };
        return (
          <span
            style={style}
            key={theme.background}
            onClick={() => handleThemeChange(theme.background)}
            className="theme-btn"
          >
            {""}
          </span>
        );
      })}
    </div>
  );
};
