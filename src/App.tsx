import React from "react";
import "./App.css";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Auth from "./components/auth/Auth";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <RouterProvider router={router}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
