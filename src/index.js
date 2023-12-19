import reportWebVitals from './reportWebVitals';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
/*с модом <React.StrictMode>  не отображаются initial values в ProfileDataForm/ (ProfileInfo 35 строка) а без мода
* не работает редакс форм в логине*/
    root.render(
        <React.StrictMode>
            <Main/>
        </React.StrictMode>
    );


/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state)
});*/  //отдаем ререндерентайртри функции субскрайб в стейт джс


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
