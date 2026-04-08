import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Guests from '../pages/Guests';
import GuestRegistration from '../pages/GuestRegistration';
import Payments from '../pages/Payments';
import PaymentDetails from '../pages/PaymentDetails';
import Reservations from '../pages/Reservations';
import ChatList from '../pages/ChatList';
import ChatOnline from '../pages/ChatOnline';
import Settings from '../pages/Settings';
import Analytics from '../pages/Analytics';


// Função auxiliar para verificar se o usuário está autenticado
const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login: NÃO protegida */}
        <Route path="/" element={<Login />} />

        {/* ROTAS PROTEGIDAS */}
        {/* Se não estiver autenticado, redireciona para a página de login */}

        <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/" />} />
        <Route path="/guests" element={isAuthenticated() ? <Guests /> : <Navigate to="/" />} />
        <Route path="/guests/register" element={isAuthenticated() ? <GuestRegistration /> : <Navigate to="/" />} />
        
        {/* Rota para edição de hóspedes: Reutiliza GuestRegistration */}
        <Route path="/guests/edit/:id" element={isAuthenticated() ? <GuestRegistration /> : <Navigate to="/" />} />

        <Route path="/payments" element={isAuthenticated() ? <Payments /> : <Navigate to="/" />} />
        <Route path="/payments/details/:reservaId" element={isAuthenticated() ? <PaymentDetails /> : <Navigate to="/" />} />
        
        <Route path="/reservations" element={isAuthenticated() ? <Reservations /> : <Navigate to="/" />} />
        {/* Rota para lista de reservas por hóspede (placeholder, precisa de componente real) */}
        {/* Criando um componente interno simples para demonstrar o useParams */}
        <Route path="/reservations/guest/:id" element={isAuthenticated() ? <GuestReservationsList /> : <Navigate to="/" />} /> 

        <Route path="/chat" element={isAuthenticated() ? <ChatList /> : <Navigate to="/" />} />
        <Route path="/chat/online/:conversaId" element={isAuthenticated() ? <ChatOnline /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated() ? <Settings /> : <Navigate to="/" />} />
        <Route path="/analytics" element={isAuthenticated() ? <Analytics /> : <Navigate to="/" />} />


        {/* Rota Curinga: Redireciona qualquer rota não encontrada para a página inicial (ou login) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

// NOVO: Componente placeholder para a lista de reservas do hóspede
// Poderia ser movido para um arquivo separado em src/pages/GuestReservationsList/index.tsx
const GuestReservationsList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID do hóspede da URL
  return (
    <div style={{ padding: '20px', marginLeft: '270px' }}>
      <h1>Reservas do Hóspede (ID: {id})</h1>
      <p>Esta tela listará as reservas do hóspede com ID: {id}.</p>
      <p>Você pode implementar a busca de reservas por hóspede aqui.</p>
    </div>
  );
};