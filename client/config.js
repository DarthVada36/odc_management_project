export const editorConfig = {
    projectId: import.meta.env.VITE_UNLAYER_PROJECT_ID,
    user: {
      id: import.meta.env.VITE_UNLAYER_USER_ID,
      name: import.meta.env.VITE_UNLAYER_USER_NAME,
      email: import.meta.env.VITE_UNLAYER_USER_EMAIL,
    },
  };
  
  export const unlayerAPI = {
    url: import.meta.env.VITE_UNLAYER_API_URL,
    apiKey: import.meta.env.VITE_UNLAYER_API_KEY,
  };
  