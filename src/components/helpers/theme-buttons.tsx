export const ThemeButtons = ({ handleThemeChange }: any) => {
  const themes = [
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460",
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560",
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1",
    },
    {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F",
    },
    {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36",
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430",
    },
  ];
  return (
    <div className="theme-btn-container">
      {themes.map((theme: any) => {
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
