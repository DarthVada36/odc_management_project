import React from 'react';
import { useForm } from 'react-hook-form';

const MainForm = ({ setIncludeMinor, setIncludeAdult, onSubmit }) => {
    const { register, handleSubmit } = useForm();

    const handleForm = (data) => {
        setIncludeMinor(data.includeMinor);
        setIncludeAdult(data.includeAdult);
        onSubmit(data); // Pasar los datos al componente padre
    };

    return (
        <div className="p-6 border border-orange bg-light shadow-md w-full max-w-screen">
            <h2 className="font-semibold text-lg mb-4 text-orange">Datos Personales</h2>
            <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                {/* Nombre Completo */}
                <div>
                    <label className="block font-medium mb-1">Nombre Completo:</label>
                    <input
                        className="w-full border border-dark px-3 py-2 rounded-md"
                        {...register('fullname', { required: true })}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium mb-1">Email:</label>
                    <input
                        className="w-full border border-dark px-3 py-2 rounded-md"
                        type="email"
                        {...register('email', { required: true })}
                    />
                </div>

                {/* Género */}
                <div>
                    <label className="block font-medium mb-1">Género:</label>
                    <select
                        className="w-full border border-dark px-3 py-2 rounded-md"
                        {...register('gender')}
                    >
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                {/* Edad */}
                <div>
                    <label className="block font-medium mb-1">Edad:</label>
                    <input
                        className="w-full border border-dark px-3 py-2 rounded-md"
                        type="number"
                        {...register('age', { required: true })}
                    />
                </div>

                {/* Checkboxes */}
                <div>
                    <label className="flex items-center gap-2">
                        <input
                            className="peer hidden"
                            type="checkbox"
                            {...register('isFirstActivity')}
                        />
                        <span className="w-5 h-5 border-2 border-orange rounded-md flex items-center justify-center text-sm font-bold text-transparent peer-checked:bg-orange peer-checked:text-white">
                            X
                        </span>
                        ¿Primera actividad?
                    </label>
                </div>
                <div>
                    <label className="flex items-center gap-2">
                        <input
                            className="peer hidden"
                            type="checkbox"
                            {...register('includeMinor')}
                            onChange={(e) => setIncludeMinor(e.target.checked)}
                        />
                        <span className="w-5 h-5 border-2 border-orange rounded-md flex items-center justify-center text-sm font-bold text-transparent peer-checked:bg-orange peer-checked:text-white">
                            X
                        </span>
                        ¿Incluir menores de 14 años?
                    </label>
                </div>
                <div>
                    <label className="flex items-center gap-2">
                        <input
                            className="peer hidden"
                            type="checkbox"
                            {...register('includeAdult')}
                            onChange={(e) => setIncludeAdult(e.target.checked)}
                        />
                        <span className="w-5 h-5 border-2 border-orange rounded-md flex items-center justify-center text-sm font-bold text-transparent peer-checked:bg-orange peer-checked:text-white">
                            X
                        </span>
                        ¿Incluir acompañante mayor de 14 años?
                    </label>
                </div>
            </form>
        </div>
    );
};

export default MainForm;
