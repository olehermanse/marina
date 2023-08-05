import Container from "@mui/material/Container";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import Stack from "@mui/material/Stack";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://oleherman.com/">
        Ole Herman S. Elgesem
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function WordCard() {
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
export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          Words
        </Typography>
        <Container>
          <Stack
            justifyContent="center"
            alignItems="stretch"
            direction="row"
            spacing={2}
          >
            <Stack
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              sx={{ width: "100%" }}
            >
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              sx={{ width: "100%" }}
            >
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
              <WordCard>Word</WordCard>
            </Stack>
          </Stack>
        </Container>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
