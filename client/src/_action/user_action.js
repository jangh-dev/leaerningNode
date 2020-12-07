import axios from 'axios';
import { 
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login', dataToSubmit).then(response => response.data); //서버에서 받은걸 request로 저장
    // request 를 redux로 넘겨주는 작업
    return {
        type: LOGIN_USER,
        payload: request
    };
};