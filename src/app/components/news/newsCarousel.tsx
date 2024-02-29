import React, { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

interface Article {
  title: string;
  link: string;
  description: string;
  // Se você adicionar scraping de imagem, descomente a linha abaixo
  image?: string;
}

const G1Carousel = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/g1");
        const html = response.data;
        const $ = cheerio.load(html);
        const scrapedArticles: Article[] = [];

        $(".feed-post-body").each((index, element) => {
          const title =
            $(element).find(".feed-post-link").text().trim() || "Sem título";
          const link = $(element).find(".feed-post-link").attr("href") || "#";
          const description =
            $(element).find(".feed-post-body-resumo").text().trim() || "";
          const image =
            $(element).find(".bstn-fd-picture-image").attr("src") || undefined; // Extrai o URL da imagem

          scrapedArticles.push({ title, link, description, image });
        });

        setArticles(scrapedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        {articles
          .filter((article) => article.title.length > 0)
          .map((article, index) => (
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
                <Typography variant="h3" textAlign="center" gutterBottom>
                  {article.title}
                </Typography>

                {article.image && (
                  <Box
                    component="img"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: 300,
                      marginBottom: 2,
                    }}
                    src={article.image}
                    alt={article.title}
                  />
                )}
                <Typography variant="h4" textAlign="center">
                  {article.description}
                </Typography>
              </Box>
              <br /> <br /> <br />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default G1Carousel;
