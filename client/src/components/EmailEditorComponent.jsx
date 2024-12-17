import React, { useRef, useEffect, useState } from 'react'
import EmailEditor from 'react-email-editor'
import EmailSendModal from './EmailSendModal'
import Select from 'react-select'
import ConfirmationModal from './ConfirmationModal'
import {
    getTemplates,
    saveTemplate,
    deleteTemplate,
    updateTemplate,
    getTemplateById,
} from '../services/templateService'
import { sendEmail } from '../services/emailService'

const EmailEditorComponent = ({ onClose, recipients = [], subject = '' }) => {
    const editorRef = useRef(null)
    const [templates, setTemplates] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTemplateId, setSelectedTemplateId] = useState(null)
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [emailContent, setEmailContent] = useState('')
    const [emailSubject, setEmailSubject] = useState(subject)
    const [emailRecipients, setEmailRecipients] = useState(recipients)
    const [useBcc, setUseBcc] = useState(false)

    // Estados para los modales de confirmación con botones
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        showInput: false,
        inputPlaceholder: '',
        initialInputValue: '',
        onConfirm: () => {},
    })

    // Estado para modales de notificación sin botones
    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        title: '',
        message: '',
    })

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setIsLoading(true)
                const templatesData = await getTemplates()
                setTemplates(templatesData)
            } catch (error) {
                console.error('Error al obtener plantillas:', error)
                showNotification('Error', 'Error al obtener las plantillas')
            } finally {
                setIsLoading(false)
            }
        }

        fetchTemplates()
    }, [])

    const showNotification = (title, message) => {
        setNotificationModal({
            isOpen: true,
            title,
            message,
        })
    }

    const handleSaveTemplate = () => {
        editorRef.current.editor.saveDesign(async (design) => {
            setConfirmModal({
                isOpen: true,
                title: 'Nueva Plantilla',
                message: 'Ingresa el nombre para la nueva plantilla:',
                showInput: true,
                inputPlaceholder: 'Nombre de la plantilla',
                onConfirm: async (templateName) => {
                    if (!templateName) return
                    try {
                        setIsSaving(true)
                        await saveTemplate(templateName, design)
                        showNotification(
                            'Éxito',
                            'Plantilla guardada exitosamente'
                        )
                        const updatedTemplates = await getTemplates()
                        setTemplates(updatedTemplates)
                    } catch (error) {
                        console.error('Error al guardar la plantilla:', error)
                        showNotification(
                            'Error',
                            'Error al guardar la plantilla'
                        )
                    } finally {
                        setIsSaving(false)
                    }
                },
            })
        })
    }

    const handleUpdateTemplate = () => {
        if (!selectedTemplateId) {
            showNotification(
                'Error',
                'Selecciona una plantilla para actualizar.'
            )
            return
        }

        editorRef.current.editor.saveDesign(async (design) => {
            try {
                await updateTemplate(selectedTemplateId, design)
                showNotification('Éxito', 'Plantilla actualizada exitosamente')
                const updatedTemplates = await getTemplates()
                setTemplates(updatedTemplates)
            } catch (error) {
                console.error('Error al actualizar la plantilla:', error)
                showNotification('Error', 'Error al actualizar la plantilla')
            }
        })
    }

    const handleLoadTemplate = async () => {
        if (!selectedTemplateId) {
            showNotification('Error', 'Selecciona una plantilla para cargar.')
            return
        }

        try {
            const selectedTemplate = await getTemplateById(selectedTemplateId)
            editorRef.current.editor.loadDesign(selectedTemplate.design)
        } catch (error) {
            console.error('Error al cargar la plantilla:', error)
            showNotification('Error', 'Error al cargar la plantilla')
        }
    }

    const handleDeleteTemplate = async () => {
        if (!selectedTemplateId) {
            showNotification('Error', 'Selecciona una plantilla para eliminar.')
            return
        }

        setConfirmModal({
            isOpen: true,
            title: 'Confirmar Eliminación',
            message: '¿Estás seguro de que deseas eliminar esta plantilla?',
            showInput: false,
            onConfirm: async () => {
                try {
                    await deleteTemplate(selectedTemplateId)
                    showNotification(
                        'Éxito',
                        'Plantilla eliminada exitosamente'
                    )
                    const updatedTemplates = await getTemplates()
                    setTemplates(updatedTemplates)
                    setSelectedTemplateId(null)
                } catch (error) {
                    console.error('Error al eliminar la plantilla:', error)
                    showNotification('Error', 'Error al eliminar la plantilla')
                }
            },
        })
    }

    const handleSendEmail = () => {
        editorRef.current.editor.exportHtml(({ html }) => {
            if (!html) {
                showNotification('Error', 'La plantilla no puede estar vacía.')
                return
            }
            setEmailContent(html)
            setShowEmailModal(true)
        })
    }

    const handleSendFromModal = async ({ subject, recipients, useBcc }) => {
        try {
            await sendEmail(recipients, subject, emailContent, useBcc)
            showNotification('Éxito', 'Correo enviado exitosamente')
            setShowEmailModal(false)
        } catch (error) {
            console.error('Error al enviar el correo:', error)
            showNotification(
                'Error',
                'Error al enviar el correo. Por favor, inténtalo de nuevo.'
            )
        }
    }

    const templateOptions = templates.map((template) => ({
        value: template.id,
        label: template.name,
    }))

    const handleTemplateChange = (selectedOption) => {
        setSelectedTemplateId(selectedOption ? selectedOption.value : null)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div
                className="relative w-full max-w-6xl mx-4 bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-orange-500 font-helvetica-w20-bold">
                            Editor de Plantillas
                        </h2>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-black transition-all duration-300 hover:text-orange-500"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-6 border-2 border-black">
                        <EmailEditor
                            ref={editorRef}
                            style={{ height: '500px', width: '100%' }}
                        />
                    </div>

                    <div className="mb-6">
                        <Select
                            value={templateOptions.find(
                                (option) => option.value === selectedTemplateId
                            )}
                            onChange={handleTemplateChange}
                            options={templateOptions}
                            placeholder="Selecciona una plantilla..."
                            isClearable
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    border: '2px solid black',
                                    borderColor: state.isFocused
                                        ? '#ff7b00'
                                        : 'black',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        borderColor: '#ff7b00',
                                    },
                                    padding: '6px',
                                    borderRadius: '0',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected
                                        ? '#212529'
                                        : 'white',
                                    color: state.isSelected ? 'white' : 'black',
                                    '&:hover': {
                                        backgroundColor: state.isSelected
                                            ? '#212529'
                                            : '#f0f0f0',
                                    },
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: 'black',
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                            })}
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-4 mobile:flex-col tablet:flex-row">
                        <div className="flex flex-col gap-2 tablet:flex-row">
                            <button
                                onClick={handleSaveTemplate}
                                className="px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Guardar nueva plantilla
                            </button>
                            <button
                                onClick={handleUpdateTemplate}
                                className="px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Actualizar plantilla
                            </button>
                            <button
                                onClick={handleDeleteTemplate}
                                className="px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Eliminar plantilla
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleLoadTemplate}
                                className="px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Cargar plantilla
                            </button>
                            <button
                                onClick={handleSendEmail}
                                className="px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Enviar correo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modales */}
                <ConfirmationModal
                    isOpen={confirmModal.isOpen}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    onConfirm={confirmModal.onConfirm}
                    onClose={() =>
                        setConfirmModal({ ...confirmModal, isOpen: false })
                    }
                    showInput={confirmModal.showInput}
                    inputPlaceholder={confirmModal.inputPlaceholder}
                    initialInputValue={confirmModal.initialInputValue}
                />

                <ConfirmationModal
                    isOpen={notificationModal.isOpen}
                    title={notificationModal.title}
                    message={notificationModal.message}
                    onClose={() =>
                        setNotificationModal({
                            ...notificationModal,
                            isOpen: false,
                        })
                    }
                    showButtons={false}
                />

                {showEmailModal && (
                    <EmailSendModal
                        isOpen={showEmailModal}
                        onClose={() => setShowEmailModal(false)}
                        onSend={handleSendFromModal}
                        initialRecipients={emailRecipients}
                        initialSubject={emailSubject}
                        initialUseBcc={useBcc}
                    />
                )}
            </div>
        </div>
    )
}

export default EmailEditorComponent
