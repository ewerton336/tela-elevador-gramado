import Avisos from "@/app/components/avisos/avisos";
import Footer from "@/app/components/footer/footer";
import NewsCarousel from "@/app/components/news/newsCarousel";
import Weather from "@/app/components/weather/weather";
import { useTheme } from "@/app/contexts/theme-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Home = () => {
  const { isDarkMode } = useTheme();

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: isDarkMode ? "black" : "",
        color: isDarkMode ? "white" : "black",
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <div>
          <h1> Teste 2 hu</h1>
          <Weather />
          <NewsCarousel />
          <Avisos />
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Home;
