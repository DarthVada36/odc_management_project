# ![ODC Manager](/client/public/introduction.png)

       **ODC: Manager** es una aplicación diseñada para gestionar y centralizar las inscripciones a los cursos que se imparten en ODC (Orange Digital Center) de manera eficiente, ofreciendo un panel de administración intuitivo y funcionalidades clave para simplificar el proceso de registro y seguimiento de datos.


### Índice
- [Características](#características-principales)
- [Tecnologías Utilizadas](#tecnologías)
- [Instalación](#instalación)
- [Roles y Permisos](#roles-y-permisos)
- [Recursos de Diseño y Base de Datos](#recursos-de-diseño-y-base-de-datos)
- [Estructura del Proyecto](#estructura)
- [Uso](#uso)
- [Herramientas y Utilidades](#herramientas-y-utilidades)
- [Documentación de la API](#Documentación-de-la-API)
- [Visionado de la Web](#visionado-de-la-web)
- [Autores](#Autores)


## Características Principales

- **Gestión de Inscripciones**: Permite registrar, editar, eliminar y monitorear las inscripciones a los cursos presenciales en ODC sin tener que redirigirse a una plataforma externa.

![Gestión de Inscripciones](public/images/gestion-inscripciones.png)

- **Panel Administrativo**: Acceso para gestionar cursos y inscripciones y administradores. El administrador tiene acceso a estadísticas y datos relevantes de cada curso y sus inscripciones, añadiendo la funcionalidad de descargar los datos en formato CSV y PDF.

![Panel Administrativo](public/images/panel-admin.png)


- **Seguridad**: Autenticación y autorización de los administradores y facilitadores mediante JWT y bcrypt.

![Seguridad](public/images/seguridad-jwt.png)

- **Interfaz Intuitiva**: UI amigable desarrollada detalladamente con Tailwind CSS, con un diseño basado totalmente en el libro de estilo de Orange. 

- **Base de Datos Relacional**: Modelo de datos eficiente y modular utilizando Sequelize. Permite que en un futuro se puedan añadir más modelos y relaciones sin afectar la estructura existente. 

## ![Tecnologías](/client/public/tecnologias.png)

     Este proyecto fue desarrollado utilizando tecnologías y librerías actuales que facilitan el desarrollo de aplicaciones web modernas y escalables.

---

### **Frontend**
![React](https://img.shields.io/badge/React-orange?style=for-the-badge&logo=react&logoColor=black) Biblioteca para construir interfaces de usuario y una página web dinámica e intuitiva.

![Vite](https://img.shields.io/badge/Vite-000000?style=for-the-badge&logo=vite&logoColor=orange) Herramienta de construcción rápida y ligera para desarrollar proyectos con React.

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-orange?style=for-the-badge&logo=tailwindcss&logoColor=black) Framework CSS para estilos rápidos y personalizables.

![Axios](https://img.shields.io/badge/Axios-000000?style=for-the-badge&logo=axios&logoColor=orange) Cliente HTTP para realizar peticiones al backend de forma sencilla.

![Select](https://img.shields.io/badge/Select-Library-orange?style=flat-square
) Libreria usada para personalizar los menús de cascada y las opciones de selección.

![Tremor](https://img.shields.io/badge/Tremor-Framework-black?style=flat-square
) usado para crear y personalizar las gráficas del dashboard principal de administración.

---

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-white?style=for-the-badge&logo=node.js&logoColor=orange) Entorno de ejecución para JavaScript en el servidor.

![Express.js](https://img.shields.io/badge/Express.js-orange?style=for-the-badge&logo=express&logoColor=black) Framework para construir APIs rápidas y escalables.

[![Sequelize](https://img.shields.io/badge/Sequelize-black?style=for-the-badge&logo=sequelize&logoColor=orange)](https://sequelize.org/) Para interactuar con la base de datos de forma más intuitiva.

![MySQL Workbench](https://img.shields.io/badge/MySQL_Workbench-white?style=for-the-badge&logo=mysql&logoColor=orange) Sistema de gestión de bases de datos relacional.

![Bcrypt](https://img.shields.io/badge/Bcrypt-orange?style=for-the-badge&logo=bcrypt&logoColor=black)  Librería para el hash de contraseñas, asegurando la seguridad de los datos sensibles.

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=orange)  Tecnología para manejar la autenticación y autorización de usuarios, asegurando la seguridad de las sesiones de usuario. 

---
### **Testing**

[![Jest](https://img.shields.io/badge/Jest-blue?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/) Framework para pruebas unitarias y de integración.

[![Supertst](https://img.shields.io/badge/Supertst-blue?style=for-the-badge&logo=supertest&logoColor=white)](https://supertest.js.org/) Librería para pruebas HTTP.

## ![Instalación](/client/public/installl.png) 



### Prerrequisitos

- **Node.js** (v14 o superior)
- **MySQL Workbench** (versión 8.x o superior)
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
   cd .. && cd server && npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
   ```env
   DB_DEV_NAME=odc_project
   DB_TEST_NAME=odc_project_test
   DB_USER=tuusuario
   DB_PASSWORD=tucontraseña
   DB_HOST=localhost
   DB_PORT=3306
   PORT=3000
   JWT_SECRET=secretKey
   NODE_ENV=development
   SECRET_KEY=miClaveSuperSecreta
   ```

4. **Configurar la base de datos:**
   - Asegúrate de tener MySQL instalado y en ejecución.
   - Crea la base de datos usando el nombre especificado en el archivo `.env`.
   - Ejecuta las migraciones usando Sequelize (si está configurado correctamente, debería crear las tablas automáticamente).

5. **Iniciar el servidor:**
   ```bash
   cd server
   npm run dev
   ```

6. **Iniciar el cliente:**
   ```bash
   cd client 
   npm run dev
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

