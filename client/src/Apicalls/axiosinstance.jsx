// import axios from 'axios';

// export const axiosInstance = axios.create({
//     headers: {
//         authorization: `Bearer ${localStorage.getItem('token')}`,
//     }
// })

import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://harithavanambackend.vercel.app",  // Set your deployed backend URL
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});
