import React, { useState } from 'react';
import { usePocket } from '../contexts/PocketContext.jsx';
import { SignUp } from '../pages/SignUp.tsx';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';

function ButtonLink({href, text}) {
  return (
    <button onClick={() => window.location.href = href}>
      {text}
    </button>
  );
}

export default function Header() {
  const { logout, user } = usePocket();

  return (
  <header className='flex flex-row items-center justify-between bg-green-500 px-5 py-1'>
    <img alt='logo' src='/favicon.svg' className='h-8' />
    <div className=''>
    {(!user) 
    ? <ButtonLink href='/signup' text='Sign up'/>
    : <p>{user.username}</p>
    }
    </div>
  </header>
  )
}
