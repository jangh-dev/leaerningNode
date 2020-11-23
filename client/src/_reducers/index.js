import { combineReducers } from 'redux'; // 스토어 안에 리듀서가 여러가지 있을 수 있음 그걸 하나로 합처 사용할수 있게 하는 것 ( 기능이 많아 질 수록 관리할수 있게 )
// import user from './user_reducer';

const rootReducer = combineReducers({
    // user,
});

export default rootReducer;
