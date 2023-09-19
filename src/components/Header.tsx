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
  <header class='flex flex-row items-center justify-between bg-green-500'>
    <img alt='logo' src='' class='' />
    <div class=''>
    {(!user) 
    ? <ButtonLink href='/signup' text='Sign up'/>
    : <p>{user.username}</p>
    }
    </div>
  </header>
  )
}
