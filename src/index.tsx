import reportWebVitals from './reportWebVitals';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from "./App";



const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Main/>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}


/*const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <Main/>
        </React.StrictMode>
    );
    */


/*с модом <React.StrictMode>  не отображаются initial values в ProfileDataForm/ (ProfileInfo 35 строка) а без мода
* не работает редакс форм в логине*/

/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state)
});*/  //отдаем ререндерентайртри функции субскрайб в стейт джс


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
