import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Backend en NestJS

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 🔹 Función para autenticar al usuario
export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const userData = response.data;

        console.log("✅ Usuario autenticado:", userData);

        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        return userData;
    } catch (error: any) { // Usa `any` para evitar errores de tipo
        console.error("❌ Error en login:", error.response?.data || error.message);
        return null;
    }
    
};

// Obtener todos los videos
export const getVideos = async () => {
    try {
        const response = await api.get('/videos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener videos:', error);
        return [];
    }
};


