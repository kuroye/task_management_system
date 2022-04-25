import { apiServerInstance } from '../ajax';

// Login
export const reqLogin = data => apiServerInstance.post('/login/', data);

// Register
export const reqRegister = data =>
	apiServerInstance.post('/register/', data);
