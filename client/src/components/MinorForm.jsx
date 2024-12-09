import React, { useState } from 'react';

const MinorForm = ({ onAddMinor }) => {
    const [minor, setMinor] = useState({ name: '', age: ''});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMinor((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!minor.name || !minor.age ) {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        setError('');
        return true;
    };

    const handleAdd = () => {
        if (validate()) {
            onAddMinor(minor);
            setMinor({ name: '', age: '', relation: '' });
        }
    };


    return (
      <div className="flex flex-col gap-2">
          <input
              type="text"
              name="name"
              placeholder="Nombre del menor"
              value={minor.name}
              onChange={handleChange}
              required
              className="border p-2 rounded-md"
          />
          <input
              type="number"
              name="age"
              placeholder="Edad"
              value={minor.age}
              onChange={handleChange}
              required
              className="border p-2 rounded-md"
          />
        
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Agregar menor
          </button>
      </div>
  );
};

export default MinorForm;
