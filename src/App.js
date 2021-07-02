import React from 'react';
import { BrowserRouter } from "react-router-dom";

import {RegisterFormProvider} from "./contexts/registerForm";
import { AuthProvider } from './contexts/auth';

import Routes from './routes/';



function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<RegisterFormProvider>
					<Routes />
				</RegisterFormProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
