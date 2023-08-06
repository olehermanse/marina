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

const dictionary = new Map([
  ["jente", "menina"],
  ["gutt", "menino"],
  ["mann", "homem"],
  ["kvinne", "mulher"],
  ["gate", "rua"],
  ["by", "cidade"],
  ["hei", "oi"],
  ["hallo", "olá"],
  ["ja", "sim"],
  ["nei", "não"],
  ["takk", "obrigado"],
  ["vær så snill", "por favor"],
  ["klatre", "escalar"],
  ["løpe", "correr"],
  ["og", "e"],
  ["eller", "ou"],
  ["han", "ele"],
  ["hun", "ela"],
  ["kjæreste", "namorado/a"],
  ["venn", "amigo/a"],
  ["hus🏠", "casa"],
  ["jobb", "trabalho"],
  ["tog🚆", "trem"],
  ["fly✈️", "avião"],
  ["søster", "irmã"],
  ["bror", "irmão"],
  ["svømme🏊", "nadar"],
  ["gå", "caminhar"],
  ["pen", "lindo/a"],
  ["smart", "inteligente"],
  ["pølse🌭", "salsicha"],
  ["brus🥤", "refrigerante"],
  ["vann💧", "água"],
  ["brød", "pao"],
  ["farris", "água com gas"],
  ["øl🍺", "cerveja"],
  ["sliten", "cansado"],
  ["våken", "acordado/a"],
  ["ord", "palavra"],
  ["en", "um"],
  ["to", "dois"],
  ["tre", "três"],
  ["fire", "quatro"],
  ["fem", "cinco"],
  ["seks", "seis"],
  ["syv", "sete"],
  ["åtte", "oito"],
  ["ni", "nove"],
  ["ti", "dez"],
  ["tjue", "vinte"],
  ["hundre", "cem"],
  ["tusen", "mil"],
]);

function getNewWords(n: number) {
  let pairs = Array.from(dictionary);
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

export default function App() {
  const [hardMode, setHardMode] = useState(false);
  const [difficulty, setDifficulty] = useState(4);
  const [score, setScore] = useState(0);
  const [buttonStates, setButtonStates]: [string[], any] = useState(
    Array(Number(difficulty)).fill("")
  );
  const [words, setWords]: [string[], any] = useState(getNewWords(difficulty));

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

  function handleFillNewWords(n: number) {
    setButtonStates(Array(n).fill(""));
    setWords(getNewWords(n));
  }

  function handleBothSidesClicked(i: number) {
    const nextButtonStates: string[] = buttonStates.slice();
    nextButtonStates[i] = "highlighted";
    let indices: number[] = [];
    for (let i = 0; i < nextButtonStates.length; i++) {
      if (nextButtonStates[i] === "highlighted") {
        indices.push(i);
      }
    }
    let a: number = indices[0];
    let word_a: string = words[a].toLowerCase();
    let b: number = indices[1];
    let word_b: string = words[b].toLowerCase();
    let correct: boolean = dictionary.get(word_a) === word_b;
    if (correct) {
      nextButtonStates[a] = "disabled";
      nextButtonStates[b] = "disabled";
      setScore(score + 1);
      if (score + 1 >= 50) {
        setHardMode(true);
      }
    } else {
      nextButtonStates[a] = "error";
      nextButtonStates[b] = "error";
    }
    setButtonStates(nextButtonStates);
    if (nextButtonStates.every((e) => e === "disabled")) {
      let newDifficulty = difficulty;
      if (difficulty < 12) {
        newDifficulty += 2;
        setDifficulty(newDifficulty);
      }
      setTimeout(() => handleFillNewWords(newDifficulty), 500);
    }
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
          🇳🇴 {score === 0 ? "-" : score} 🇧🇷
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
                      hardMode={hardMode}
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
                      hardMode={hardMode}
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
