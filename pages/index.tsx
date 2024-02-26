import Avisos from "@/app/components/avisos/avisos";
import Footer from "@/app/components/footer/footer";
import NewsCarousel from "@/app/components/news/newsCarousel";
import Weather from "@/app/components/weather/weather";

export default function Home() {
  return (
    <div>
      <Weather />
      <NewsCarousel />
      <Avisos/>
      <Footer/> 
    </div>
  );
}
