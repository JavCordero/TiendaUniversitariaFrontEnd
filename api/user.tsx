import { getToken, setToken, clearToken } from '../api/token';

const API_PATH = "http://127.0.0.1:8000/api";

export const loginAPI = async (email: string, password: string) => {
   const url = `${API_PATH}/login`;
   const params = {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
   }

   const res = await fetch(url, params);
   const data = await res.json();
   return data;
}

export const logoutAPI = async () => {
   const url = `${API_PATH}/logout`;
   const params = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res = await fetch(url, params);
   const data = await res.json();
   return data;
}

export const getUserAPI = async () => {
   const url = `${API_PATH}/user`;
   const params = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res = await fetch(url, params);
   const data = await res.json();
   console.log(data);
   return data;
}
export const getUserId = async (id: string) => {
   const url = `${API_PATH}/users/${id}`;
   const params = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res = await fetch(url, params);
   const data = await res.json();
   return data;
}

export const registerUserAPI = async (nombre: string, apellido: string, email: string, password: string, password_confirmed: string, rol: string) => {
   let name = nombre + " " + apellido;
   const url = `${API_PATH}/register`;
   const params = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
         name: name,
         email: email,
         password: password,
         password_confirmed: password_confirmed,
         rol: rol,
      })
   }
   const res = await fetch(url, params);
   const data = await res.json();
   return data;
}

export const getUsers = async () => {
   const url = `${API_PATH}/usuarios`;
   const params = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res = await fetch(url, params);
   const data = await res.json();
   return data;
}