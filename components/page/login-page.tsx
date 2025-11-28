"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../layout/navbar';
import InputField from '../global/input-field';
import Button from '../global/button';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First, try to sign in
      const res = await signIn("credentials", { 
        redirect: false, 
        email: form.email,
        password: form.password
      });
      
      console.log('SignIn response:', res);
      
      if (res?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }
      
      if (res?.ok) {
        console.log('=== LOGIN SUCCESS ===');
        console.log('Email:', form.email);
        
        // Determine redirect based on email
        if (form.email === 'admin@example.com') {
          console.log('Redirecting to admin dashboard...');
          window.location.href = '/admin_dashboard';
        } else if (form.email === 'student@example.com') {
          console.log('Redirecting to student dashboard...');
          window.location.href = '/student_dashboard';
        } else if (form.email === 'consumer@example.com') {
          console.log('Redirecting to consumer page...');
          window.location.href = '/consumer';
        } else {
          console.log('Redirecting to home...');
          window.location.href = '/';
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Sign In</h2>
          
          {error && (
            <div className="mb-4 text-red-600 text-center text-sm" role="alert">
              {error}
            </div>
          )}
          
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={isLoading}
            required
          />
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
