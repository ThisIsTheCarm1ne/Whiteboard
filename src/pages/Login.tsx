import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePocket } from '../contexts/PocketContext';

export default function Login () {
  const loginRef = useRef();
  const passwordRef = useRef();
  const { login } = usePocket();
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const inputStyle = `w-full mb-3 p-3 bg-transparent 
  border-green-200 border-2 rounded
  focus:outline-none focus:border-green-500`;

  const handleOnSubmit = useCallback(
    async (evt) => {
      try {
        evt?.preventDefault();
        await login(loginRef.current.value, passwordRef.current.value);
        navigate('/dashboard');
      } catch(err) {
        setError(err.message);
        console.log(err.message);

        setTimeout(() => {
          setError(null);
        }, 4000);
      }
    },
    [login]
  );

  return (
    <section className='absolute top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    border border-green-500 border-4 rounded
    p-4 w-1/3'>
      {error != null ? <p className='text-rose-500'>{error}</p> : null}
      <h1 className='text-green-500 mb-3'>Login</h1>
      <form onSubmit={handleOnSubmit}>
        <div className='flex flex-col items-center'>
          <input placeholder='Login' type='login' ref={loginRef} className={inputStyle}/>
          <input placeholder='Password' type='password' ref={passwordRef} className={inputStyle}/>
        </div>
        <button className='bg-emerald-200' type='submit'>Login</button>
        <button className='bg-emerald-200 ml-2' type='button' onClick={() => navigate('/signup')}>Sign up</button>
      </form>
    </section>
  );
};
