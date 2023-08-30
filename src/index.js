import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Historial from './Historial';
import reportWebVitals from './reportWebVitals';

// Para ver la parte del Usuario 2 colocar en 
// la parte de <Reac.StrictMode> </React.StrictMode>
// <App />, y para el historial <Historial />

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
