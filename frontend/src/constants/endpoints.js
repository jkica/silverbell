const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getAllUsersUrl = () => `${BASE_URL}/getAllUsers`;
export const getCurrentUserUrl = () => `${BASE_URL}/me`;
export const LoginUrl = () => `${BASE_URL}/login`;
export const RegisterUrl = () => `${BASE_URL}/register`;
