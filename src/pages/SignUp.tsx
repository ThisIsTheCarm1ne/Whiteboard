import React, { useCallback, useRef } from 'react';
import { usePocket } from '../contexts/PocketContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const loginRef= useRef();
  const usernameRef= useRef();
  const passwordRef = useRef();
  const { register } = usePocket();

  const inputStyle = `w-full mb-3 p-3 bg-transparent 
  border-green-200 border-2 rounded
  focus:outline-none focus:border-green-500`;
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      await register(
      loginRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value
      );
      navigate('/login');
    },
    [register]
  );

  return (
    <section class='absolute top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    border border-green-500 border-4 rounded
    p-4 w-1/3'>
      <h1 class='text-green-500 mb-3'>Sign Up</h1>
      <form onSubmit={handleOnSubmit} class=''>
        <div class='flex flex-col items-center'>
          <input placeholder="Login" type="text" ref={loginRef} class={inputStyle}/>
          <input placeholder="Username" type="text" ref={usernameRef} class={inputStyle}/>
          <input placeholder="Password" type="password" ref={passwordRef} class={inputStyle}/>
          <input placeholder="Confirm password" type="password" class={inputStyle}/>
        </div>
        <button type="submit">Create</button>
        <Link to="/login">Login</Link>
      </form>
    </section>
  )
}
