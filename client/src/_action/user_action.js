import axios from 'axios';
import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit).then(response => response.data); //서버에서 받은걸 request로 저장
    // request 를 redux로 넘겨주는 작업
    return {
        type: LOGIN_USER,
        payload: request
    };
};

// server에 있는 index의 post주소랑 같아야 사용할 수 있음
export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit).then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    };
};

// get 이기때문에 body부분은 필요가 없음
export function auth() {
    const request = axios.get('/api/users/auth').then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    };
};