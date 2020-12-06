import axios from 'axios';
import { 
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login', body).then(response => {
        response.data
    });
    // request 를 redux로 넘겨주는 작업
    return {
        type: "LOGIN_USER",
        payload: request
    };
};