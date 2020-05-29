import React, { useState } from 'react';
import styles from './EditableText.css';

const EditableText = ({ children, onSubmit, ...props }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(children);

  const handleChange = evt => {
    setValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const val = value.trim();
    if (!val.length) {
      console.warn('text must have length');
      return;
    }
    setValue(val);
    setEditing(false);
    onSubmit(val);
  };

  return (
    <span style={styles} className='EditableText'>
      {editing ? (
        <form className='EditableText-form' onSubmit={handleSubmit}>
          <input
            className='EditableText-input'
            type='text'
            autoFocus
            value={value}
            onChange={handleChange}
            onBlur={handleSubmit}
          />
        </form>
      ) : (
        <div onDoubleClick={() => setEditing(true)} {...props}>
          {value}
        </div>
      )}
    </span>
  );
};

export default EditableText;
