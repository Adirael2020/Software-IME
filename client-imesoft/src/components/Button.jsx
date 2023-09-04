import React from 'react';

const Button = ({ onClick, text, className }) => {
  return (
    <button onClick={onClick} className={`py-2 ${className}`}>{text}</button>
  );bg
};

export default Button;