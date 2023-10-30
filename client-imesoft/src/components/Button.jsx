import React from 'react';

const Button = ({ onClick, text, className }) => {
  return (
    <button onClick={onClick} className={`py-1 hover:underline underline-offset-4 ${className}`}>{text}</button>
  );bg
};

export default Button;