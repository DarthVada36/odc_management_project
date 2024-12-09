/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Busca estilos en todos tus archivos JS y JSX
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter'],
            },
            colors: {
                // Colores principales
                primary: '#ff6600',
                secondary: '#00a1e0',
                inputBorder: '#CCCCCC',
                paceHolderText: '#666666',
                success: '#28a745',
                info: '#17a2b8',
                warning: '#ffc107',
                danger: '#dc3545',
                light: '#f8f9fa',
                dark: '#343a40',

                // Tonos adicionales
                neutral: {
                    100: '#f8f9fa',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#adb5bd',
                    600: '#6c757d',
                    700: '#495057',
                    800: '#343a40',
                    900: '#212529',
                },

                // Otros colores útiles
                orange: '#ff7b00',
                blue: '#007bff',
                green: '#28a745',
                red: '#dc3545',
                yellow: '#ffc107',
            },
            screens: {
                // Breakpoints personalizados
                mobile: '320px', // Teléfonos móviles pequeños
                tablet: '768px', // Tablets y dispositivos medianos
                laptop: '1024px', // Portátiles y pantallas estándar
                desktop: '1280px', // Pantallas grandes
            },
        },
    },
    plugins: [],
}
