
import React, { useState } from 'react';

const AdultCompanionForm = ({ onAddCompanion }) => {
    const [companion, setCompanion] = useState({ name: '', contact: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanion((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!companion.name || !companion.contact) {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        setError('');
        return true;
    };

    const handleAdd = () => {
        if (validate()) {
            onAddCompanion(companion);
            setCompanion({ name: '', contact: '' });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                name="name"
                placeholder="Nombre del acompañante adulto"
                value={companion.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
            />
            <input
                type="text"
                name="contact"
                placeholder="Contacto"
                value={companion.contact}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={handleAdd} className="bg-purple-500 text-white px-4 py-2 rounded-md">
                Agregar acompañante adulto
            </button>
        </div>
    );
};

export default AdultCompanionForm;
