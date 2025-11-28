import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ type = 'button', disabled = false, onClick, children, ...props }: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
    {...props}
  >
    {children}
  </button>
);

export default Button;
