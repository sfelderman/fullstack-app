import React, { useState, KeyboardEvent } from 'react';

type EditableText = {
  children: string;
  onSubmit: (evt: any) => void;
};

const EditableText = ({ children, onSubmit, ...props }: EditableText) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(children);

  function reset() {
    setValue(children);
    setEditing(false);
  }

  function handleChange(evt: React.FormEvent) {
    setValue((evt.target as HTMLTextAreaElement).value);
  }

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const val = value.trim();
    if (!val.length) {
      console.warn('Input text must have length');
      return;
    }
    setValue(val);
    setEditing(false);
    onSubmit(val);
  }

  function handleKeyDown(evt: KeyboardEvent) {
    const code = evt.keyCode;
    if (code === 13 || evt.key === 'Enter') return handleSubmit(evt); // enter
    if (code === 27 || evt.key === 'Escape') return reset();
  }

  return (
    <span className='EditableText'>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <textarea
            className='form-control'
            autoFocus
            onFocus={evt => (evt.target.selectionStart = evt.target.textLength)}
            value={value}
            onKeyDown={handleKeyDown}
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
