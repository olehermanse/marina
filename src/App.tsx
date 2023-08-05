import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import WordCard from "./WordCard";
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
