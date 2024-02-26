import React from "react";
import { AppBar, Toolbar, Typography, Link, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <AppBar position="fixed" color="transparent" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          Desenvolvido por: Ewerton Guimarães
        </Typography>
        
          <IconButton color="inherit">
            <WhatsAppIcon />
          </IconButton>
          (13) 99782-7870
 
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
