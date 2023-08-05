import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://oleherman.com/">
        Ole Herman S. Elgesem
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}


const WordCard = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

function click(event) {
  console.log("Click");
  console.log(event);
  event.target.
}
export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          Marina's words
        </Typography>
        <Container>
          <Stack justifyContent="center" alignItems="stretch" direction="row" spacing={2}>
            <Stack justifyContent="center" alignItems="stretch" spacing={2} sx={{ width: '100%' }}>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
            </Stack>
            <Stack justifyContent="center" alignItems="stretch" spacing={2} sx={{ width: '100%' }}>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
              <WordCard onClick={(e) => {click(e)}}>Word</WordCard>
            </Stack>
          </Stack>
        </Container>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
