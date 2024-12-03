import React from 'react';

const Button = (props) => {
    const {label, onClick, variant, size , disabled = false, className = ""} = props;

    
    const classes = `btn btn-${variant} btn-${size} ${disabled ? "btn-disabled" : ""} ${className}`;
    
    
  return (
    <button 
        className={classes} 
        onClick={disabled ? undefined : onClick}>
      {label}
    </button>
  );
}

export default Button;
