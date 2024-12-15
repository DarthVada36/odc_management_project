# ![ODC Manager](/client/public/introduction.png)

**ODC: Manager** es una aplicación diseñada para gestionar y centralizar las inscripciones a los cursos que se imparten en ODC (Orange Digital Center) de manera eficiente, ofreciendo un panel de administración intuitivo y funcionalidades clave para simplificar el proceso de registro y seguimiento de datos.

## ![Tecnologías](/client/public/tecnologias.png)

Este proyecto fue desarrollado utilizando las siguientes tecnologías y librerías:

### **Frontend**
- **React**: Biblioteca para construir interfaces de usuario.
![Logo React](public/images/react-logo.png)
- **Tailwind CSS**: Framework CSS para estilos rápidos y personalizables.
![Tailwind CSS](public/images/tailwind-logo.png)

### **Backend**
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
![Node.js](public/images/nodejs-logo.png)
- **Express**: Framework para construir APIs rápidas y escalables.
![Express](public/images/express-logo.png)
- **Sequelize**: ORM para interactuar con la base de datos.
![Sequelize](public/images/sequelize-logo.png)
- **MySQL**: Sistema de gestión de bases de datos relacional.
![MySQL](public/images/mysql-logo.png)
- **dotenv**: Manejo seguro de variables de entorno.
![dotenv](public/images/dotenv-logo.png)
- **cors**: Manejo de políticas de recursos cruzados.
- **jsonwebtoken (jwt)**: Autenticación basada en tokens.

### **Testing**
- **Jest**: Framework para pruebas unitarias y de integración.
![Jest](public/images/jest-logo.png)
- **Supertest**: Librería para pruebas HTTP.
![Supertest](public/images/supertest-logo.png)

## ![Características](public/images/features-icon.png) ✨ Características Principales

- **Gestión de Inscripciones**: Permite registrar, editar y eliminar inscripciones.
![Gestión de Inscripciones](public/images/gestion-inscripciones.png)
- **Panel Administrativo**: Acceso para gestionar usuarios y roles.
![Panel Administrativo](public/images/panel-admin.png)
- **Seguridad**: Autenticación y autorización mediante JWT.
![Seguridad](public/images/seguridad-jwt.png)
- **Interfaz Intuitiva**: UI amigable desarrollada con Tailwind CSS.
- **Base de Datos Relacional**: Modelo de datos eficiente utilizando Sequelize.

## ![Instalación](public/images/setup-icon.png) 🛠️ Instalación y Configuración

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

### Prerrequisitos

- **Node.js** (v14 o superior)
- **MySQL** (versión 8.x o superior)
- **Git**

### Instrucciones

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ODC:Manager
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   cd client && npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_datos
   JWT_SECRET=clave_secreta_para_jwt
   PORT=3000
   ```

4. **Configurar la base de datos:**
   - Asegúrate de tener MySQL instalado y en ejecución.
   - Crea la base de datos usando el nombre especificado en el archivo `.env`.
   - Ejecuta las migraciones usando Sequelize (si está configurado).

5. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

6. **Iniciar el cliente:**
   ```bash
   cd client && npm start
   ```

7. **Acceder a la aplicación:**
   Visita `http://localhost:3000` en tu navegador.

## ![Pruebas](public/images/tests-icon.png) 🧪 Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:
```bash
npm test
```

Las pruebas cubren:
- Validación de endpoints.
- Comportamiento del frontend.
- Autenticación y seguridad.

## ![Capturas](public/images/screenshots-icon.png) 📸 Capturas de Pantalla

### Página Principal
![Página Principal](public/images/pagina-principal.png)

### Panel de Administración
![Panel Administrativo](public/images/panel-admin.png)

### Seguridad JWT
![Seguridad JWT](public/images/seguridad-jwt.png)

## ![Contribuidores](public/images/contributors-icon.png) 👥 Contribuidores

- **[Tu Nombre]**: Desarrollo del frontend y backend.
- _(Incluye más nombres si corresponde)_

## ![Próximos Pasos](public/images/next-steps-icon.png) 📌 Próximos Pasos

- Despliegue en Docker.
- Mejorar cobertura de pruebas.
- Optimización del rendimiento para grandes volúmenes de datos.

---

Si tienes alguna duda o necesitas más información, no dudes en contactarnos.

