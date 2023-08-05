import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import WordCard from "./WordCard";
import Stack from "@mui/material/Stack";
import { useState } from "react";

function Copyright() {
  return (
    <Typography
      sx={{ mt: 6 }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://oleherman.com/">
        Ole Herman S. Elgesem
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const dictionary = {
  jente: "menina",
  gutt: "menino",
  mann: "homem",
  kvinne: "mulher",
  gate: "rua",
  by: "cidade",
  hei: "oi",
  hallo: "ola",
  ja: "sim",
  nei: "nao",
  takk: "obrigado",
  "vær så snill": "por favor",
  klatre: "escalar",
  løpe: "correr",
  og: "e",
  eller: "ou",
  han: "ele",
  hun: "ela",
  kjæreste: "namorado/a",
};

function getNewWords() {
  let pairs = Object.entries(dictionary);
  shuffleArray(pairs);
  let selection = pairs.slice(0, 5);
  let no: string[] = [];
  let pt: string[] = [];
  for (let pair of selection) {
    let a = pair[0].toUpperCase();
    let b = pair[1].toUpperCase();
    no.push(a);
    pt.push(b);
  }
  shuffleArray(no);
  shuffleArray(pt);
  return [...no, ...pt];
}

export default function App() {
  const [buttonStates, setButtonStates] = useState(Array(10).fill(""));
  const [words, setWords] = useState(getNewWords());

  function leftSideClicked() {
    return buttonStates.slice(0, 5).some((e) => e === "highlighted");
  }

  function rightSideClicked() {
    return buttonStates.slice(5, 10).some((e) => e === "highlighted");
  }

  function handleFillNewWords() {
    setButtonStates(Array(10).fill(""));
    setWords(getNewWords());
  }

  function handleBothSidesClicked(i) {
    const nextButtonStates = buttonStates.slice();
    nextButtonStates[i] = "highlighted";
    let indices = [];
    for (let i = 0; i < nextButtonStates.length; i++) {
      if (nextButtonStates[i] === "highlighted") {
        indices.push(i);
      }
    }
    let a = indices[0];
    let b = indices[1];
    let correct = dictionary[words[a].toLowerCase()] === words[b].toLowerCase();
    if (correct) {
      nextButtonStates[a] = "disabled";
      nextButtonStates[b] = "disabled";
    } else {
      nextButtonStates[a] = "";
      nextButtonStates[b] = "";
    }
    if (nextButtonStates.every((e) => e === "disabled")) {
      handleFillNewWords();
      return;
    }
    setButtonStates(nextButtonStates);
  }

  function handleWordClick(i) {
    if (buttonStates[i] === "disabled" || buttonStates[i] === "highlighted") {
      return;
    }
    if (i < 5 && leftSideClicked()) {
      return;
    }
    if (i >= 5 && rightSideClicked()) {
      return;
    }
    if (leftSideClicked() || rightSideClicked()) {
      handleBothSidesClicked(i);
      return;
    }
    const nextButtonStates = buttonStates.slice();
    nextButtonStates[i] = "highlighted";
    setButtonStates(nextButtonStates);
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          🇳🇴 - 🇧🇷
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
              <WordCard
                word={words[0]}
                buttonState={buttonStates[0]}
                onWordClick={() => {
                  handleWordClick(0);
                }}
              ></WordCard>
              <WordCard
                word={words[1]}
                buttonState={buttonStates[1]}
                onWordClick={() => {
                  handleWordClick(1);
                }}
              ></WordCard>
              <WordCard
                word={words[2]}
                buttonState={buttonStates[2]}
                onWordClick={() => {
                  handleWordClick(2);
                }}
              ></WordCard>
              <WordCard
                word={words[3]}
                buttonState={buttonStates[3]}
                onWordClick={() => {
                  handleWordClick(3);
                }}
              ></WordCard>
              <WordCard
                word={words[4]}
                buttonState={buttonStates[4]}
                onWordClick={() => {
                  handleWordClick(4);
                }}
              ></WordCard>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              sx={{ width: "100%" }}
            >
              <WordCard
                word={words[5]}
                buttonState={buttonStates[5]}
                onWordClick={() => {
                  handleWordClick(5);
                }}
              ></WordCard>
              <WordCard
                word={words[6]}
                buttonState={buttonStates[6]}
                onWordClick={() => {
                  handleWordClick(6);
                }}
              ></WordCard>
              <WordCard
                word={words[7]}
                buttonState={buttonStates[7]}
                onWordClick={() => {
                  handleWordClick(7);
                }}
              ></WordCard>
              <WordCard
                word={words[8]}
                buttonState={buttonStates[8]}
                onWordClick={() => {
                  handleWordClick(8);
                }}
              ></WordCard>
              <WordCard
                word={words[9]}
                buttonState={buttonStates[9]}
                onWordClick={() => {
                  handleWordClick(9);
                }}
              ></WordCard>
            </Stack>
          </Stack>
        </Container>
        <Copyright />
      </Box>
    </Container>
  );
}
