import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTheme } from "@/app/contexts/theme-context";
import { useRouter } from "next/router";

const Footer = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  // Função para lidar com o clique no botão de edição
  const handleEditClick = () => {
    router.push("/edit");
  };

  // Função para lidar com o clique no botão de volta à home
  const handleHomeClick = () => {
    router.push("/");
  };

  // Verifica se a página atual é a página de edição
  const isEditPage = router.pathname === "/edit";

  return (
    <AppBar position="fixed" color="transparent" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          Desenvolvido por: Ewerton Guimarães
        </Typography>

        {isEditPage ? (
          <Button onClick={handleHomeClick}>
            Voltar
          </Button>
        ) : (
          <Button onClick={handleEditClick}>
            Editar
          </Button>
        )}

        <IconButton color="inherit">
          <WhatsAppIcon />
        </IconButton>
        (13) 99782-7870

        <Button onClick={toggleTheme} sx={{ ml: 2 }}>
          {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
