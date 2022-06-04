import Navbar from "./components/navbar";
import MapWrapper from "./components/mapWrapper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./contexts/UserContext";
import "./app.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4B8673",
    },
    secondary: {
      main: "#F6FBF4",
    },
  },
});

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Navbar />
          <MapWrapper />
        </div>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
