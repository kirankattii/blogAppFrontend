import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/context';
import axios from 'axios'
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const { token, setToken, backendUrl } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", { name, email, password });

        if (data.success) {
          toast.success(data.message);
          setState("Login");
        } else {
          toast.error(data.errors?.email || data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });

        if (data.success) {
          localStorage.setItem("blogtoken", data.access_token);
          setToken(data.access_token);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.errors?.email || data.errors?.password || data.message);
        }
      }
    } catch (error) {
      const serverError = error.response?.data;
      toast.error(serverError?.errors?.email || serverError?.errors?.password || serverError?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto isolate p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold '>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "login"} to book appointment</p>
        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ? <p>Already have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Login')}>Login here</span></p> : <p>Don't have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Sign Up')}>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
