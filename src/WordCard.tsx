import Paper from "@mui/material/Paper";

export default function WordCard({ word, onWordClick, buttonState }) {
  let wordCardStyle = {
    bgcolor: "#ffffff",
    color: "#000000",
    height: "60px",
    lineHeight: "60px",
    transition: "all .3s ease",
    WebkitTransition: "all .3s ease",
    MozTransition: "all .3s ease",
    userSelect: "none",
  };
  if (buttonState === "highlighted") {
    wordCardStyle.bgcolor = "#7dafff";
  }
  if (buttonState === "disabled") {
    wordCardStyle.bgcolor = "#d2e2fc";
    wordCardStyle.color = "#919191";
  }
  return (
    <Paper align="center" onClick={onWordClick} sx={wordCardStyle}>
      {word}
    </Paper>
  );
}
