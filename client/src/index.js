import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
// Redux 다운로드 : npm install redux react-redux redux-promise redux-thunk --save
// 보통은 Store만 사용하는데 객체를 받아야 하기에 promise function 를 사용하기 위해서 위에걸 적용하여 사용함
// client 단에 다운받아야 함 
// ↓ Redux 사용시 필요
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore); // 객체를 사용하기 위해 미들웨어와 함께 사용


// 크롬에 리덕스 익스텐션 사용 하기 위해 아래 window. 시작하는 걸 넣음
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
