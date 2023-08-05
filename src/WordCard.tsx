import { useState } from "react";
import Paper from "@mui/material/Paper";

export default function WordCard() {
  const [wordText, setWordText] = useState("Word");
  const [clicked, setClicked] = useState(false);
  let wordCardStyle = {
    bgcolor: "#ffffff",
    height: "60px",
    lineHeight: "60px",
  };
  if (clicked) {
    wordCardStyle.bgcolor = "#7dafff";
  }
  return (
    <Paper
      align="center"
      onClick={() => {
        setWordText("New word");
        setClicked(true);
      }}
      sx={wordCardStyle}
    >
      {wordText}
    </Paper>
  );
}
