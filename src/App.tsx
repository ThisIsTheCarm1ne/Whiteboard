import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp.tsx';
import Login  from './pages/Login.tsx';
import Index  from './pages/Index.tsx';
import Dashboard from './pages/Dashboard.tsx';
import RequireAuth from './components/RequireAuth.tsx';

import { PocketProvider } from './contexts/PocketContext';

export default function App() {
  return (
    <>
    <PocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Index />} />
          <Route element={<RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PocketProvider>
    </>
  );
};
