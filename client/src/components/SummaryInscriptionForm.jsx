import React, { useState } from 'react'
import { exportToPDF } from '../utils/exportUtils'
import { sendEmail } from '../services/emailService'
import { svgToPngBase64 } from '../utils/svgUtils'
import ConfirmationModal from './ConfirmationModal'

const Summary = ({
    formData,
    minors,
    adult,
    courseTitle,
    courseDescription,
    courseDate,
    courseSchedule,
    handleSubmit,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalProps, setModalProps] = useState({
        title: '',
        message: '',
        onConfirm: () => {},
    })

    const openModal = (title, message, onConfirm) => {
        setModalProps({ title, message, onConfirm })
        setIsModalOpen(true)
    }

    const handleInscription = async () => {
        try {
            const response = await fetch('../public/orange-logo.svg')
            const svgContent = await response.text()
            const logoBase64 = await svgToPngBase64(svgContent)

            const htmlContent = `
        <div class="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <!-- Encabezado -->
            <header class="bg-orange-500 py-4 px-6 flex items-center gap-4">
              <img src="${logoBase64}" alt="Orange Digital Center" class="w-12 h-12">
              <h1 class="text-white text-2xl font-bold">Orange Digital Center</h1>
            </header>

            <!-- Contenido del correo -->
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Resumen de tu inscripción</h2>

              <!-- Información del curso -->
              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 class="text-orange-500 text-lg font-bold mb-2">${
                    courseTitle || 'Curso no especificado'
                }</h3>
                <p class="text-gray-700"><strong>Descripción:</strong> ${
                    courseDescription || 'No especificada'
                }</p>
                <p class="text-gray-700"><strong>Fecha:</strong> ${
                    courseDate || 'No especificada'
                }</p>
                <p class="text-gray-700"><strong>Horario:</strong> ${
                    courseSchedule || 'No especificado'
                }</p>
              </div>

              <!-- Datos del titular -->
              <div class="mb-6">
                <h4 class="text-orange-500 text-lg font-bold mb-2">Datos del titular:</h4>
                <p class="text-gray-700"><strong>Nombre Completo:</strong> ${
                    formData.fullname || 'No proporcionado'
                }</p>
                <p class="text-gray-700"><strong>Email:</strong> ${
                    formData.email || 'No proporcionado'
                }</p>
                <p class="text-gray-700"><strong>Género:</strong> ${
                    formData.gender || 'No proporcionado'
                }</p>
                <p class="text-gray-700"><strong>Edad:</strong> ${
                    formData.age || 'No proporcionado'
                }</p>
                <p class="text-gray-700"><strong>Primera Actividad:</strong> ${
                    formData.is_first_activity ? 'Sí' : 'No'
                }</p>
                <p class="text-gray-700"><strong>Recibe Newsletter:</strong> ${
                    formData.accepts_newsletter ? 'Sí' : 'No'
                }</p>
              </div>

              <!-- Datos de menores -->
              ${
                  minors.length > 0
                      ? `<div class="mb-6">
                     <h4 class="text-orange-500 text-lg font-bold mb-2">Menores Inscritos:</h4>
                     <ul class="list-disc pl-5 text-gray-700">
                       ${minors
                           .map(
                               (minor, index) =>
                                   `<li>Menor ${index + 1}: <strong>${
                                       minor.name || 'No proporcionado'
                                   }</strong> - ${
                                       minor.age || 'No proporcionado'
                                   } años</li>`
                           )
                           .join('')}
                     </ul>
                   </div>`
                      : ''
              }

              <!-- Datos del adulto -->
              ${
                  adult
                      ? `<div class="mb-6">
                     <h4 class="text-orange-500 text-lg font-bold mb-2">Adulto Acompañante:</h4>
                     <p class="text-gray-700"><strong>Nombre:</strong> ${
                         adult.fullname || 'No proporcionado'
                     }</p>
                     <p class="text-gray-700"><strong>Email:</strong> ${
                         adult.email || 'No proporcionado'
                     }</p>
                     <p class="text-gray-700"><strong>Género:</strong> ${
                         adult.gender || 'No proporcionado'
                     }</p>
                     <p class="text-gray-700"><strong>Edad:</strong> ${
                         adult.age || 'No proporcionado'
                     }</p>
                   </div>`
                      : ''
              }

              <!-- Mensaje de agradecimiento -->
              <div class="text-center text-gray-600 mt-6">
                <p>Gracias por inscribirte. Nos vemos en el curso.</p>
              </div>
            </div>
          </div>
        </div>
      `

            // Asunto del correo
            const subject = `Resumen de tu inscripción al curso "${courseTitle}"`

            // Llamar a sendEmail y capturar la respuesta del backend
            const result = await sendEmail(
                [formData.email, ...(adult ? [adult.email] : [])],
                subject,
                htmlContent
            )

            // Verificar la respuesta del backend y mostrarla en el modal
            if (result.success) {
                openModal(
                    'Inscripción Exitosa',
                    result.message ||
                        'Tu inscripción se ha completado con éxito.',
                    () => {
                        setIsModalOpen(false)
                        if (typeof handleSubmit === 'function') {
                            handleSubmit() // Llama a la lógica de redirección SOLO cuando el usuario acepta
                        }
                    }
                )
            } else {
                openModal(
                    'Error',
                    result.message ||
                        'No se pudo completar la inscripción. Inténtalo de nuevo.',
                    () => setIsModalOpen(false) // Cierra solo el modal sin redirección
                )
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error)

            // Capturar errores inesperados y mostrarlos en el modal
            openModal(
                'Error',
                'Hubo un error inesperado. Inténtalo de nuevo más tarde.',
                () => setIsModalOpen(false)
            )
        }
    }
    const handleExportPDF = async () => {
        const title = `Resumen de Inscripción: ${courseTitle || 'Curso'}`
        const headers = ['Campo', 'Valor']
        const data = [
            ['Nombre Completo', formData.fullname || 'No proporcionado'],
            ['Email', formData.email || 'No proporcionado'],
            ['Género', formData.gender || 'No proporcionado'],
            ['Edad', formData.age || 'No proporcionado'],
            ['Primera Actividad', formData.is_first_activity ? 'Sí' : 'No'],
            ['Recibe Newsletter', formData.accepts_newsletter ? 'Sí' : 'No'],
        ]

        if (minors.length > 0) {
            minors.forEach((minor, index) => {
                data.push([
                    `Menor ${index + 1}`,
                    `${minor.name || 'No proporcionado'} - ${
                        minor.age || 'No proporcionado'
                    } años`,
                ])
            })
        }

        if (adult) {
            data.push([
                'Adulto Acompañante - Nombre',
                adult.fullname || 'No proporcionado',
            ])
            data.push([
                'Adulto Acompañante - Email',
                adult.email || 'No proporcionado',
            ])
            data.push([
                'Adulto Acompañante - Género',
                adult.gender || 'No proporcionado',
            ])
            data.push([
                'Adulto Acompañante - Edad',
                adult.age || 'No proporcionado',
            ])
        }

        try {
            await exportToPDF(title, headers, data, 'resumen_inscripcion.pdf')
        } catch (error) {
            console.error('Error al exportar a PDF:', error)
        }
    }

    return (
        <div className="relative w-full overflow-visible border-2 border-primary">
            <div className="p-8 bg-white">
                {/* Título del resumen */}
                <h2 className="mb-6 text-3xl font-bold text-center text-orange-500 font-helvetica-w20-bold">
                    Resumen de tu inscripción
                </h2>
                <h3 className="mb-8 text-xl font-semibold text-center text-gray-600">
                    Curso: {courseTitle || 'No especificado'}
                </h3>

                {/* Datos del adulto principal */}
                <div className="mb-6">
                    <h4 className="mb-4 text-lg font-semibold text-orange-500">
                        Datos del titular:
                    </h4>
                    <p className="text-gray-600">
                        <strong>Nombre Completo:</strong>{' '}
                        {formData.fullname || 'No proporcionado'}
                    </p>
                    <p className="text-gray-600">
                        <strong>Email:</strong>{' '}
                        {formData.email || 'No proporcionado'}
                    </p>
                    <p className="text-gray-600">
                        <strong>Género:</strong>{' '}
                        {formData.gender || 'No proporcionado'}
                    </p>
                    <p className="text-gray-600">
                        <strong>Edad:</strong>{' '}
                        {formData.age || 'No proporcionado'}
                    </p>
                    <p className="text-gray-600">
                        <strong>Primera Actividad:</strong>{' '}
                        {formData.is_first_activity ? 'Sí' : 'No'}
                    </p>
                    <p className="text-gray-600">
                        <strong>Recibe Newsletter:</strong>{' '}
                        {formData.accepts_newsletter ? 'Sí' : 'No'}
                    </p>
                </div>

                {/* Datos de los menores */}
                {minors.length > 0 && (
                    <div className="mb-6">
                        <h4 className="mb-4 text-lg font-semibold text-orange-500">
                            Menores Inscritos:
                        </h4>
                        <ul className="space-y-2">
                            {minors.map((minor, index) => (
                                <li key={index} className="text-gray-600">
                                    {minor.name} - {minor.age} años
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Datos del adulto acompañante */}
                {adult && (
                    <div className="mb-6">
                        <h4 className="mb-4 text-lg font-semibold text-orange-500">
                            Adulto Acompañante:
                        </h4>
                        <p className="text-gray-600">
                            <strong>Nombre:</strong>{' '}
                            {adult.fullname || 'No proporcionado'}
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong>{' '}
                            {adult.email || 'No proporcionado'}
                        </p>
                        <p className="text-gray-600">
                            <strong>Género:</strong>{' '}
                            {adult.gender || 'No proporcionado'}
                        </p>
                        <p className="text-gray-600">
                            <strong>Edad:</strong>{' '}
                            {adult.age || 'No proporcionado'}
                        </p>
                    </div>
                )}

                {/* Botones */}
                <div className="pt-6 mt-8 text-center border-t">
                    <p className="mb-6 text-gray-600">
                        Si tus datos son correctos, pulsa en{' '}
                        <strong>Inscribirse</strong> o descárgalos como PDF.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <button
                            onClick={handleInscription}
                            className="px-6 py-3 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            Inscribirse
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="px-6 py-3 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            Descargar PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                title={modalProps.title}
                message={modalProps.message}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={modalProps.onConfirm}
                showButtons={true}
            />
        </div>
    )
}

export default Summary
