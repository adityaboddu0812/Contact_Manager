import React from 'react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = ''
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-foreground mb-1"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-md border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all ${
          error ? 'border-destructive' : 'border-input'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default InputField;
