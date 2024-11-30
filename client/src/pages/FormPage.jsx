import React from 'react'

const FormPage = () => {
    return (
        <div className="flex flex-col items-center min-h-screen overflow-auto bg-gray-100 ">
            {/* Encabezado */}
            <header className="w-full p-4 text-center text-white bg-blue-500 shadow-md">
                <h1 className="text-2xl font-bold">Página de Formulario</h1>
                <p className="text-sm">
                    Llena el formulario y explora nuestra página
                </p>
            </header>

            {/* Contenido principal */}
            <main className="w-full max-w-3xl p-6 mt-6 space-y-8 bg-white rounded-lg shadow-md">
                {/* Introducción */}
                <section>
                    <h2 className="text-xl font-semibold">Bienvenido</h2>
                    <p>
                        A continuación, encontrarás un formulario que puedes
                        llenar con tus datos. Desplázate hacia abajo para
                        explorar todo el contenido de esta página.
                    </p>
                </section>

                {/* Formulario */}
                <form className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Escribe tu nombre"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="example@correo.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Escribe tu mensaje aquí"
                            rows="5"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Enviar
                    </button>
                </form>

                {/* Contenido adicional */}
                <section>
                    <h2 className="text-xl font-semibold">
                        Contenido adicional
                    </h2>
                    <p>
                        Esta es una sección extra para mostrar cómo el contenido
                        adicional puede extenderse y permitir el desplazamiento
                        de la página.
                    </p>
                    <ul className="mt-4 list-disc list-inside">
                        <li>Información interesante 1</li>
                        <li>Información interesante 2</li>
                        <li>Información interesante 3</li>
                    </ul>
                </section>
            </main>

            {/* Pie de página */}
            <footer className="w-full py-4 mt-6 text-center text-white bg-gray-800">
                <p className="text-sm">
                    © 2024 Página de Formulario. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    )
}

export default FormPage
