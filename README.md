# ![ODC Manager](/client/public/introduction.png)

**ODC: Manager es una aplicación diseñada para gestionar y centralizar las inscripciones a los cursos que se imparten en ODC (Orange Digital Center) de manera eficiente, ofreciendo un panel de administración intuitivo y funcionalidades clave para simplificar el proceso de registro y seguimiento de datos.**


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

- **Panel Administrativo**: Acceso para gestionar cursos y inscripciones y administradores. El administrador tiene acceso a estadísticas y datos relevantes de cada curso y sus inscripciones, añadiendo la funcionalidad de descargar los datos en formato CSV y PDF.

- **Seguridad**: Autenticación y autorización de los administradores y facilitadores mediante JWT y bcrypt.

- **Interfaz Intuitiva**: UI amigable desarrollada detalladamente con Tailwind CSS, con un diseño basado totalmente en el libro de estilo de Orange. 

- **Figma y Figjam**  
<img src="/client/public/figma.png" alt="GIT" width="50" />

   - [Archivo de Figma](https://www.figma.com/design/uMD8gF2knntP7RVJ2zbXOu/ODC-Project?node-id=38-2&t=qJjDhTyAu7a0Y6dm-1)

   Flujo de proceso de la aplicación hecho en FigJam para facilitar el proceso de desarrollo

   - [Archivo de FigJam](https://www.figma.com/board/mf9pIQYRdpqPogAEU4heTu/Flowchart-ODC-orange-project?node-id=8-1124&t=1Ly8NL067XHC22B4-1) 




- **Base de Datos Relacional**: Modelo de datos eficiente y modular utilizando Sequelize. Permite que en un futuro se puedan añadir más modelos y relaciones sin afectar la estructura existente. 

![MySQL](/client/public/drawSQLdos.png)

## ![Tecnologías](/client/public/tecnologias.png)

**Este proyecto fue desarrollado utilizando tecnologías y librerías actuales que facilitan el desarrollo de aplicaciones web modernas y escalables**

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

- **Node.js**  
<img src="/client/public/nodejsLight.svg" alt="NODE.JS" width="100" />

- **MySQL Workbench**  
<img src="/client/public/mysql-logo-svg-vector.svg" alt="MYSQL" width="100" />

- **Git**  
<img src="/client/public/Git-Icon-1788C.png" alt="GIT" width="50" />

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
   DB_USER=tuUsuario
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
   Visita `http://localhost:5173/` en tu navegador.


## Estructura del Proyecto

      odc_project/
          ├── client/                  # Código del frontend (interfaz de usuario)
          │   ├── node_modules/        # Dependencias del cliente
          │   ├── public/              # Archivos estáticos (imágenes, CSS, index.html)
          │   ├── src/                 # Código fuente de la aplicación cliente
          │   │   ├── assets/          # Recursos estáticos (imágenes, estilos)
          │   │   ├── components/      # Componentes reutilizables de React
          │   │   ├── context/         # Contexto de React
          │   │   ├── layout/          # Componentes de diseño y navegación
          │   │   ├── pages/           # Páginas principales
          │   │   ├── services/        # Servicios y llamadas a la API
          │   │   ├── test/            # Pruebas unitarias del frontend
          │   │   ├── utils/           # Utilidades y funciones auxiliares
          │   │   └── Main.jsx         # Componente principal de la aplicación
          │   ├── eslint.config.js     # Configuración de ESLint
          │   ├── index.html           # Página principal
          │   ├── postcss.config.js    # Configuración de PostCSS
          │   ├── tailwind.config.js   # Configuración de TailwindCSS
          │   └── vite.config.js       # Configuración de Vite
          ├── server/                  # Código del backend (API y lógica del servidor)
          │   ├── controllers/         # Controladores que gestionan lógica de las rutas
          │   ├── database/            # Configuración de la base de datos
          │   ├── interfaces/          # Definiciones de tipos de datos e interfaces
          │   ├── mailer/              # Configuración de nodemailer
          │   ├── middleware/          # Middleware para autenticación, logs, etc.
          │   ├── models/              # Modelos de la base de datos (ORM)
          │   ├── node_modules/        # Dependencias del servidor
          │   ├── routes/              # Definición de las rutas de la API
          │   ├── utils/               # Funciones de utilidad usadas en el servidor
          │   ├── test                 # Pruebas unitarias del backend
          │   └── .env                 # Variables de entorno para el servidor
          └── README.md                # Documentación del proyecto

## ![Pruebas](/client/public/Tests.png)

Para ejecutar las pruebas, utiliza el siguiente comando:
```bash
npx run test roleModel.test.js
npx run test adminModel.test.js
```

**Las pruebas cubren:**
- Creación de administradores
- Creación de roles
- Creación de inscripciones

## Capturas de Pantalla (Muestra de diseño Responsive)

### Panel de Administración (PC/Laptop)

<img src="/client/public/laptopdashboard.png" alt="GIT" width="90%" />

<img src="/client/public/tabletdashboard.png" alt="GIT" width="90%" />

### Página Principal de Cursos (PC/Movil)

<img src="/client/public/cursoslaptop.png" alt="GIT" width="80%" />

<img src="/client/public/cursosmovil.png" alt="GIT" width="50%" />

### Formulario de Inscripción (PC/Movil)

<img src="/client/public/inscripcionmovil.png" alt="GIT" width="50%" />

<img src="/client/public/cursoslaptop.png" alt="GIT" width="90%" /> Pendiente cambiar cuando se arreglle el bug de la imagen


## ![Contribuidores](/client/public/collaborators.png)  

**José Ruiz**

Proyect Owner, Frontend Developer Backend Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jruizndev) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/josealfonsoruiz/)


**Vada Velázquez**

Scrum Master, Frontend Developer, Backend Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DarthVada36) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/avadavelazquez/)

**Wilder Aguilar**

Backend Developer, Frontend Developer, Data Scientist

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Wilder-Aguilar) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilderaguilar/)

**César Mercado**

Backend Developer, Frontend Developer 

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/merkandez) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cesarmercadoh/)


**Sara Alcaraz**

UI/UX Designer, Frontend Developer, Backend Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sarixav) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saraalcarazvalverde/)


**Jennifer Tello**

Frontend Developer, Backend Developer, Tester

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jennyfer85) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jennytellogarc%C3%ADa/)
---

Si tienes alguna duda o necesitas más información, no dudes en contactarnos.

