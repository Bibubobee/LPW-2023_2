import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Admin from './Admin';
import SearchPage from './SearchPage';
import App from './App';
import PaginaLibro from './PaginaLibro';
import Historial from './Historial';
import Login from "./Login"
import reportWebVitals from './reportWebVitals';

// Para ver la parte del Usuario 2 colocar en 
// la parte de <Reac.StrictMode> </React.StrictMode>
// <App />, y para el historial <Historial />

const root = ReactDOM.createRoot(document.getElementById('root'));
const stateEnum = {User : 0, Librarian : 1, Admin: 2}
const curr_state = stateEnum.User

let currPage

if (curr_state === stateEnum.User){
	currPage = <SearchPage />
}
else if (curr_state === stateEnum.Admin){
	currPage = <Admin />
}

root.render(
	<React.StrictMode>
		{/* <div class="bg-light">
			<App/>
			{currPage}
		</div> */}
		<Login/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
