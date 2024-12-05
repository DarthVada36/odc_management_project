import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const MinorForm = ({ onAddMinor }) => {
  const { register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'minors' });

  const onSubmit = (data) => {
    onAddMinor(data.minors);
  };


  return (
    <div className="p-4 m-2 border border-orange flex flex-col gap-4 text-dark bg-light font-inter">
      <h2 className="font-bold text-lg text-left">Datos de menores</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row items-center gap-6">
            <div className="flex-1">
              <label htmlFor={`minors[${index}].name`} className="block">
                Nombre:
              </label>
              <input
                id={`minors[${index}].name`}
                {...register(`minors[${index}].name`, { required: true })}
                className="border border-dark w-full px-2 py-1"
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`minors[${index}].age`} className="block">
                Edad:
              </label>
              <input
                id={`minors[${index}].age`}
                {...register(`minors[${index}].age`, { required: true })}
                type="number"
                className="border border-dark w-full px-2 py-1"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Eliminar
            </button>
          </div>
        ))}
        {fields.length < 3 && (
          <button
            type="button"
            onClick={() => append({ name: "", age: "" })}
            className="bg-orange text-white px-4 py-2 font-semibold"
          >
            Agregar Menor
          </button>
        )}
        {/* Eliminar el botón de "Guardar" */}
      </form>
    </div>
  );
};

export default MinorForm;
