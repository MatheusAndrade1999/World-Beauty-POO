import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Clientes from './Pages/Clientes/Clientes';
import Produto from './Pages/Produtos/Produtos';
import Servicos from './Pages/Servicos/Servicos';
import Cadastros from './Pages/Cadastro/Cadastro';
import Vendas from './Pages/PaginaVendas/PaginaVendas';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/cadastro" element={<Cadastros />} />
          <Route path="/vendas" element={<Vendas />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
