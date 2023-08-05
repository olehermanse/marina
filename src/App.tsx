import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import WordCard from "./WordCard";
import Stack from "@mui/material/Stack";
import { useState } from "react";

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

const dictionary = [
  ["jente", "menina"],
  ["gutt", "menino"],
  ["mann", "homem"],
  ["kvinne", "mulher"],
  ["gate", "rua"],
  ["by", "cidade"],
  ["hei", "oi"],
  ["hallo", "ola"],
  ["ja", "sim"],
  ["nei", "nao"],
  ["takk", "obrigado"],
  ["værsåsnill", "por favor"],
  ["klatre", "escalar"],
  ["løpe", "correr"],
  ["og", "e"],
  ["eller", "ou"],
  ["han", "ele"],
  ["hun", "ela"],
  ["kjæreste", "namorado/a"],
];

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default function App() {
  let pairs = dictionary.slice(0, 5);
  let solutions = {};
  let no: string[] = [];
  let pt: string[] = [];
  for (let pair of pairs) {
    let a = pair[0].toUpperCase();
    let b = pair[1].toUpperCase();
    solutions[a] = b;
    no.push(a);
    pt.push(b);
  }
  shuffleArray(no);
  shuffleArray(pt);

  const [highlights, setHighlights] = useState(Array(10).fill(false));
  const [words, setWords] = useState([...no, ...pt]);

  function leftSideClicked() {
    return highlights.slice(0, 5).some((e) => e === true);
  }

  function rightSideClicked() {
    return highlights.slice(5, 10).some((e) => e === true);
  }

  function handleWordClick(i) {
    if (i < 5 && leftSideClicked()) {
      return;
    }
    if (i >= 5 && rightSideClicked()) {
      return;
    }
    const nextHighlights = highlights.slice();
    nextHighlights[i] = true;
    setHighlights(nextHighlights);
  }
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
              <WordCard
                word={words[0]}
                highlighted={highlights[0]}
                onWordClick={() => {
                  handleWordClick(0);
                }}
              ></WordCard>
              <WordCard
                word={words[1]}
                highlighted={highlights[1]}
                onWordClick={() => {
                  handleWordClick(1);
                }}
              ></WordCard>
              <WordCard
                word={words[2]}
                highlighted={highlights[2]}
                onWordClick={() => {
                  handleWordClick(2);
                }}
              ></WordCard>
              <WordCard
                word={words[3]}
                highlighted={highlights[3]}
                onWordClick={() => {
                  handleWordClick(3);
                }}
              ></WordCard>
              <WordCard
                word={words[4]}
                highlighted={highlights[4]}
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
                highlighted={highlights[5]}
                onWordClick={() => {
                  handleWordClick(5);
                }}
              ></WordCard>
              <WordCard
                word={words[6]}
                highlighted={highlights[6]}
                onWordClick={() => {
                  handleWordClick(6);
                }}
              ></WordCard>
              <WordCard
                word={words[7]}
                highlighted={highlights[7]}
                onWordClick={() => {
                  handleWordClick(7);
                }}
              ></WordCard>
              <WordCard
                word={words[8]}
                highlighted={highlights[8]}
                onWordClick={() => {
                  handleWordClick(8);
                }}
              ></WordCard>
              <WordCard
                word={words[9]}
                highlighted={highlights[9]}
                onWordClick={() => {
                  handleWordClick(9);
                }}
              ></WordCard>
            </Stack>
          </Stack>
        </Container>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
