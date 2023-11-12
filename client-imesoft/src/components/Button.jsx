import React from 'react';

const Button = ({ onClick, text, className }) => {
  return (
    <button type="button" onClick={onClick} className={`py-1  ${className}`}>{text}</button>
  );
};

export default Button;