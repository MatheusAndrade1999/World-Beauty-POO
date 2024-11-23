import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6" className="navbar-title">
          World Beauty
        </Typography>
        <div className="navbar-buttons">
          <Button color="inherit" href="/vendas" className="navbar-button">Vendas</Button>
          <Button color="inherit" href="/clientes" className="navbar-button">Clientes</Button>
          <Button color="inherit" href="/produto" className="navbar-button">Produtos</Button>
          <Button color="inherit" href="/servicos" className="navbar-button">Serviços</Button>
          <Button color="inherit" href="/cadastro" className="navbar-button">Cadastro</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
