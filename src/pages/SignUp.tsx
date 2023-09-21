import React, { useCallback, useRef, useState } from 'react';
import { usePocket } from '../contexts/PocketContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const usernameRef= useRef();
  const loginRef= useRef();
  const passwordRef = useRef();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const { register } = usePocket();
  const [error, setError] = useState('');

  const inputStyle = `w-full mb-3 p-3 bg-transparent 
  border-green-200 border-2 rounded
  focus:outline-none focus:border-green-500`;
  const navigate = useNavigate();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword: string = e.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword: string = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
        if (!passwordsMatch) {
        setError('Passwords do not match');
        setTimeout(() => {
          setError('');
        }, 4000);
        return;
      }

      try {
        await register(
          usernameRef.current.value,
          loginRef.current.value,
          passwordRef.current.value
        );
        navigate('/login');
      } catch(err) {
        setError(err.message);

        setTimeout(() => {
          setError(null);
        }, 4000);
      }
    },
    [register]
  );

  return (
    <section className='absolute top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    border border-green-500 border-4 rounded
    p-4 w-1/3'>
      {error != null ? <p className='text-rose-500'>{error}</p> : null}
      <h1 className='text-green-500 mb-3'>Sign Up</h1>
      <form onSubmit={handleOnSubmit} className=''>
        <div className='flex flex-col items-center'>
          <input placeholder="Login" type="text" ref={usernameRef} className={inputStyle} minLength="3" required />
          <input placeholder="Username" type="text" ref={loginRef} className={inputStyle} required />
          <input
            placeholder="Password"
            type="password"
            ref={passwordRef}
            className={inputStyle}
            minLength="8"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            placeholder="Confirm password"
            type="password"
            className={inputStyle}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordsMatch ? null : (
          <p className='text-rose-500'>Passwords do not match</p>
        )}
        <button className='bg-emerald-200' type='submit'>Create</button>
        <button className='bg-emerald-200 ml-2' type='button' onClick={() => navigate('/login')}>Login</button>
      </form>
    </section>
  )
}
