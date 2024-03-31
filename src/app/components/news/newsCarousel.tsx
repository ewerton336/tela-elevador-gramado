import React from "react";
import axios from "axios";
import cheerio from "cheerio";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import config from "../../../../config";
import { useQuery } from '@tanstack/react-query';

interface Article {
  title: string;
  link: string;
  description: string;
  image?: string;
}

const G1Carousel = () => {
  const fetchArticles = async (): Promise<Article[]> => {
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
        $(element).find(".bstn-fd-picture-image").attr("src") || undefined;

      scrapedArticles.push({ title, link, description, image });
    });

    return scrapedArticles;
  };

  const {isLoading, error, data: articles } = useQuery<Article[]>({
    queryKey: ['g1'],
    queryFn: () => fetchArticles(),
    refetchInterval: config.FetchIntervalAvisos * 1000,
  });


if (isLoading) return <div>Carregando Notícias...</div>;

if (error) return <div>Ocorreu um erro ao carregar notícias: {error.message}</div>;

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
      <Box
        sx={{
          maxWidth: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "100%",
          overflow: "hidden",
          "@media (max-width: 767px)": {
            maxHeight: "none",
            height: "auto",
            marginBottom: "20px",
          },
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
          {articles!
            .filter((article) => article.title.length > 0 && article.image)
            .map(({ title, image, description }, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    maxHeight: "500px",
                  }}
                >
                  {image && (
                    <Box
                      component="img"
                      sx={{
                        objectFit: "cover",
                        maxWidth: "100%",
                        width: "100%",
                        height: "auto",
                        borderRadius: "9px",
                        margin: "auto",
                        display: "block",
                      }}
                      src={image}
                      alt={title}
                    />
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "20px",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "9px",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="h4" textAlign="center" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="h4" textAlign="center">
                      {description}
                    </Typography>
                    <Typography variant="h6" textAlign="center">
                      Fonte: G1
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default G1Carousel;
