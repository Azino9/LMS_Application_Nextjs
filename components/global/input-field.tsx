import React, { InputHTMLAttributes, ChangeEvent } from 'react';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  name: string;
}

const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  name,
  ...props 
}: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm text-black font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      {...props}
    />
    {error && (
      <p id={`${name}-error`} className="text-xs text-red-500 mt-1">
        {error}
      </p>
    )}
  </div>
);

export default InputField;
