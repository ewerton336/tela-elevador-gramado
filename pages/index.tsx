import DateTime from "@/app/components/datetime/dateTime";
import NewsCarousel from "@/app/components/news/newsCarousel";
import Weather from "@/app/components/weather/weather";

export default function Home() {
  return (
    <div>
      <Weather />
      <NewsCarousel />
    </div>
  );
}
