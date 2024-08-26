import React from 'react';

export function Input({ type, name, placeholder, onChange, value }) {
  return (
    <div className='field'>
      <input type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
}
