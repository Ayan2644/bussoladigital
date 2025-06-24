import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

// Páginas principais
import Login from './pages/Login';
import Simulador from './pages/Simulador';
import Planejamento from './pages/Planejamento';
import Conta from './pages/Conta';

// Novas ferramentas
import Sonar from './pages/Sonar';
import Metricas from './pages/Metricas';
import CPAMaximo from './pages/CPAMaximo';

// Layout com menu lateral
import Layout from './components/Layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Rota isolada da tela de login */}
        <Route path="/login" element={<Login />} />

        {/* Redirecionamento raiz para a primeira ferramenta */}
        <Route path="/" element={<Navigate to="/planejamento" />} />

        {/* Rotas com menu lateral */}
        <Route path="/" element={<Layout />}>
          <Route path="planejamento" element={<Planejamento />} />
          <Route path="simulador" element={<Simulador />} />
          <Route path="sonar" element={<Sonar />} />
          <Route path="metricas" element={<Metricas />} />
          <Route path="cpa-maximo" element={<CPAMaximo />} />
          <Route path="conta" element={<Conta />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
