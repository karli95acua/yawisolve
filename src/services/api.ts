import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Backend en NestJS

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

// Obtener videos por módulo
export const getVideosByModule = async (moduloId: number) => {
    try {
        const response = await api.get(`/videos/modulo/${moduloId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener videos por módulo:', error);
        return [];
    }
};
