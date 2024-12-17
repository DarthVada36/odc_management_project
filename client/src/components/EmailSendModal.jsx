import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

const EmailSendModal = ({
    isOpen,
    onClose,
    onSend,
    initialRecipients = [],
    initialSubject = '',
    initialUseBcc = false,
}) => {
    const [recipients, setRecipients] = useState(initialRecipients)
    const [subject, setSubject] = useState(initialSubject)
    const [useBcc, setUseBcc] = useState(initialUseBcc)

    // Estado modal de confirmación
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        showInput: false,
        onConfirm: () => {},
    })

    if (!isOpen) return null

    // Validación de asunto
    const handleSend = () => {
        if (!subject.trim()) {
            setConfirmModal({
                isOpen: true,
                title: 'Error',
                message: 'El asunto no puede estar vacío.',
                showButtons: false,
            })
            return
        }

        // Validación destinatarios
        const validRecipients = recipients.filter(
            (email) => email.trim() !== ''
        )
        if (validRecipients.length === 0) {
            setConfirmModal({
                isOpen: true,
                title: 'Error',
                message: 'Debe ingresar al menos un destinatario válido.',
                showButtons: false,
            })
            return
        }

        // Confirmación de los destinatarios
        setConfirmModal({
            isOpen: true,
            title: 'Confirmar envío',
            message: `¿Desea enviar el correo a los siguientes destinatarios?\n\n${validRecipients.join(
                '\n'
            )}`,
            showButtons: true,
            onConfirm: () => {
                onSend({ subject, recipients: validRecipients, useBcc })
            },
        })
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div
                className="relative w-full max-w-md mx-4 bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-orange-500 font-helvetica-w20-bold">
                            Enviar correo
                        </h2>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-black transition-all duration-300 hover:text-orange-500"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Asunto */}
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-dark">
                            Asunto del correo:
                        </label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                            placeholder="Ingresa el asunto"
                        />
                    </div>

                    {/* Destinatarios */}
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-dark">
                            Destinatarios:
                        </label>
                        <textarea
                            value={recipients.join(', ')}
                            onChange={(e) =>
                                setRecipients(
                                    e.target.value
                                        .split(',')
                                        .map((email) => email.trim())
                                )
                            }
                            className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                            rows={4}
                            placeholder="Ingresa los correos separados por comas"
                        />
                    </div>

                    {/* Checkbox para CCO */}
                    <div className="flex items-center gap-2 mb-6">
                        <input
                            type="checkbox"
                            id="bccToggle"
                            checked={useBcc}
                            onChange={(e) => setUseBcc(e.target.checked)}
                            className="w-5 h-5 border-2 border-black text-primary focus:ring-primary"
                        />
                        <label
                            htmlFor="bccToggle"
                            className="font-bold text-dark"
                        >
                            Enviar como copia oculta (CCO)
                        </label>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col gap-4 mt-8">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSend}
                            className="px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            Enviar
                        </button>
                    </div>
                </div>

                {/* Modal de confirmación */}
                <ConfirmationModal
                    isOpen={confirmModal.isOpen}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    onConfirm={confirmModal.onConfirm}
                    onClose={() =>
                        setConfirmModal({ ...confirmModal, isOpen: false })
                    }
                    showButtons={confirmModal.showButtons}
                />
            </div>
        </div>
    )
}

export default EmailSendModal
