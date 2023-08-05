import Paper from "@mui/material/Paper";

export default function WordCard({ word, onWordClick, highlighted }) {
  let wordCardStyle = {
    bgcolor: "#ffffff",
    height: "60px",
    lineHeight: "60px",
  };
  if (highlighted) {
    wordCardStyle.bgcolor = "#7dafff";
  }
  return (
    <Paper align="center" onClick={onWordClick} sx={wordCardStyle}>
      {word}
    </Paper>
  );
}
