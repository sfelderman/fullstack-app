import React from 'react';
import { useState } from 'react';

const EditableText = ({ children, ...props }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(children);

  const handleChange = evt => {
    setValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!value.trim().length) {
      console.warn('text must have length');
      return;
    }
    setValue(value.trim());
    setEditing(false);
  };

  if (editing) {
    return (
      <form onSubmit={handleSubmit}>
        <input type='text' autoFocus value={value} onChange={handleChange} onBlur={handleSubmit} />
      </form>
    );
  }
  return (
    <div onDoubleClick={() => setEditing(true)} {...props}>
      {value}
    </div>
  );
};

export default EditableText;
