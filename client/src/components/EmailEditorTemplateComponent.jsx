import React, { useRef, useEffect } from 'react'
import EmailEditor from 'react-email-editor'
import { saveTemplate, updateTemplate } from '../services/templateService'

const EmailEditorTemplateComponent = ({
    selectedTemplate,
    onSaveComplete,
    onSendEmail,
}) => {
    const editorRef = useRef(null)

    // Cargar plantilla seleccionada en el editor
    useEffect(() => {
        if (selectedTemplate && editorRef.current) {
            editorRef.current.editor.loadDesign(selectedTemplate.design)
        }
    }, [selectedTemplate])

    // Guardar plantilla nueva o actualizar existente
    const handleSave = async () => {
        const name = prompt(
            'Introduce el nombre de la plantilla:',
            selectedTemplate?.name || ''
        )
        if (!name) return

        editorRef.current.editor.saveDesign(async (design) => {
            try {
                if (selectedTemplate) {
                    // Actualizar plantilla existente
                    await updateTemplate(selectedTemplate.id, { name, design })
                    alert('Plantilla actualizada con éxito')
                } else {
                    // Guardar nueva plantilla
                    await saveTemplate(name, design)
                    alert('Plantilla guardada con éxito')
                }
                onSaveComplete()
            } catch (error) {
                console.error('Error al guardar la plantilla:', error.message)
                alert('Error al guardar la plantilla')
            }
        })
    }

    // Enviar email utilizando la plantilla actual
    const handleSendEmail = () => {
        editorRef.current.editor.exportHtml(async (data) => {
            const { html } = data
            const subject = prompt('Introduce el asunto del correo:')
            if (!subject) return

            try {
                await onSendEmail(subject, html)
                alert('Correo enviado con éxito')
            } catch (error) {
                console.error('Error al enviar el correo:', error.message)
                alert('Error al enviar el correo')
            }
        })
    }

    return (
        <div className="editor-container">
            <div className="editor-actions">
                <button className="button-primary" onClick={handleSave}>
                    {selectedTemplate
                        ? 'Actualizar Plantilla'
                        : 'Guardar Plantilla'}
                </button>
                <button className="button-secondary" onClick={handleSendEmail}>
                    Enviar Email
                </button>
            </div>
            <div className="editor-wrapper">
                <EmailEditor ref={editorRef} />
            </div>
        </div>
    )
}

export default EmailEditorTemplateComponent
