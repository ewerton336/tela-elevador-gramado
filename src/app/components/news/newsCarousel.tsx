import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

interface NewsData {
  title?: string;
  description?: string;
}

const NewsCarousel = () => {
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=br&apiKey=a4b4b67d75db430483b9abd07210adb9"
        );
        setNewsItems(response.data.articles);
      } catch (error) {
        console.error("Erro ao obter notícias:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
    >
      {newsItems.map((newsItem, index) => (
        <SwiperSlide key={index}>
          <h2>{newsItem.title}</h2>
          <p>{newsItem.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NewsCarousel;
