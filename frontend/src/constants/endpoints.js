const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getCurrentUserUrl = () => `${BASE_URL}/me`;
export const getAllUsersUrl = () => `${BASE_URL}/get-all-users`;
export const RegisterUrl = () => `${BASE_URL}/register`;
export const LoginUrl = () => `${BASE_URL}/login`;
export const LogOutUrl = () => `${BASE_URL}/logout`;
