import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
        const response = await axios.get("/api/news");
        setNewsItems(response.data.articles);
      } catch (error) {
        console.error("Erro ao obter notícias:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        wordSpacing: 3
      }}
    >
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
        <br></br>
        {newsItems.map((newsItem, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4" textAlign="center" gutterBottom >
                {newsItem.title}
              </Typography>
              <Typography>{newsItem.description}</Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default NewsCarousel;
