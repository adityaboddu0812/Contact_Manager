import React from 'react';

const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = '',
  rows = 3
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
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 rounded-md border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all resize-none ${
          error ? 'border-destructive' : 'border-input'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default TextAreaField;
