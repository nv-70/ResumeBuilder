export const  BASE_URL = 'http://localhost:4000';

// Routes Used for Frontend

export const API_PATHS ={
    AUTH:{
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        //LOGOUT: `/api/auth/logout`,
        GET_PROFILE: '/api/auth/profile'
    },
    RESUME:{
        CREATE: '/api/resume',
        GET_ALL: '/api/resume',
        GET_BY_ID: (id) => `/api/resume/${id}`,

        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,

        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,

    },
    image:{
        UPLOAD_IMAGE: 'api/auth/upload-image'
    }

}
