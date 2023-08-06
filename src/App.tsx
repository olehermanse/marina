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

function getNewWords(n) {
  let pairs = Object.entries(dictionary);
  shuffleArray(pairs);
  let selection = pairs.slice(0, n / 2);
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

interface GameState {
  difficulty: number;
  score: number;
}

class GameObject {
  difficulty: number;
  score: number;
  constructor(state: GameState) {
    this.difficulty = state.difficulty;
    this.score = state.score;
  }

  get state(): GameState {
    return { score: this.score, difficulty: this.difficulty };
  }
}

export default function App() {
  const [gameState, setGameState] = useState(
    new GameObject({ difficulty: 4, score: 0 }).state
  );
  const [buttonStates, setButtonStates]: [string[], any] = useState(
    Array(Number(gameState.difficulty)).fill("")
  );
  const [words, setWords]: [string[], any] = useState(
    getNewWords(gameState.difficulty)
  );

  function leftSideClicked() {
    return buttonStates
      .slice(0, words.length / 2)
      .some((e) => e === "highlighted");
  }

  function rightSideClicked() {
    return buttonStates
      .slice(words.length / 2, words.length)
      .some((e) => e === "highlighted");
  }

  function handleFillNewWords(n) {
    setButtonStates(Array(n).fill(""));
    setWords(getNewWords(n));
  }

  function handleBothSidesClicked(i: any) {
    const nextButtonStates = buttonStates.slice();
    nextButtonStates[i] = "highlighted";
    let indices = [];
    for (let i = 0; i < nextButtonStates.length; i++) {
      if (nextButtonStates[i] === "highlighted") {
        indices.push(i);
      }
    }
    let a: any = indices[0];
    let b: any = indices[1];
    let game = new GameObject(gameState);
    let correct: any =
      dictionary[words[a].toLowerCase()] === words[b].toLowerCase();
    if (correct) {
      nextButtonStates[a] = "disabled";
      nextButtonStates[b] = "disabled";
      game.score += 1;
      setGameState(game.state);
    } else {
      nextButtonStates[a] = "error";
      nextButtonStates[b] = "error";
    }
    if (nextButtonStates.every((e) => e === "disabled")) {
      if (gameState.difficulty < 12) {
        game.difficulty += 2;
        handleFillNewWords(game.difficulty);
        setGameState(game.state);
      } else {
        handleFillNewWords(gameState.difficulty);
      }
      return;
    }
    setButtonStates(nextButtonStates);
  }

  function handleWordClick(i: any) {
    if (buttonStates[i] === "disabled" || buttonStates[i] === "highlighted") {
      return;
    }
    if (i < words.length / 2 && leftSideClicked()) {
      return;
    }
    if (i >= words.length / 2 && rightSideClicked()) {
      return;
    }
    if (leftSideClicked() || rightSideClicked()) {
      handleBothSidesClicked(i);
      return;
    }
    const nextButtonStates = buttonStates.slice();
    nextButtonStates[i] = "highlighted";
    for (let j = 0; j < nextButtonStates.length; j++) {
      if (nextButtonStates[j] === "error") {
        nextButtonStates[j] = "";
      }
    }
    setButtonStates(nextButtonStates);
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          🇳🇴 {gameState.score === 0 ? "-" : gameState.score} 🇧🇷
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
              {[...Array(words.length).keys()]
                .slice(0, words.length / 2)
                .map((i) => {
                  return (
                    <WordCard
                      buttonState={buttonStates[i]}
                      onWordClick={() => {
                        handleWordClick(i);
                      }}
                      word={words[i]}
                    />
                  );
                })}
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              sx={{ width: "100%" }}
            >
              {[...Array(words.length).keys()]
                .slice(words.length / 2, words.length)
                .map((i) => {
                  return (
                    <WordCard
                      buttonState={buttonStates[i]}
                      onWordClick={() => {
                        handleWordClick(i);
                      }}
                      word={words[i]}
                    />
                  );
                })}
            </Stack>
          </Stack>
        </Container>
        <Copyright />
      </Box>
    </Container>
  );
}
