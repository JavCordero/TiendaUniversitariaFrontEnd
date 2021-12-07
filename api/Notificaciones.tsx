import {getToken, setToken, clearToken} from '../api/token';

const API_PATH= "http://127.0.0.1:8000/api";

export const getNotificaciones= async()=> {
    const url= `${API_PATH}/notificaciones`;
    const params= {
       method: "GET",
       headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
       },
    }
    const res= await fetch(url, params);
    const data= await res.json();

    return data;
}

export const getNotificacionesNoLeidas= async()=> {
   const url= `${API_PATH}/notificaciones/no-leidas`;
   const params= {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res= await fetch(url, params);
   const data= await res.json();

   return data;
}

export const deleteNotificaciones= async(id:any)=> {
   const url= `${API_PATH}/notificaciones/${id}`;
   const params= {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res= await fetch(url, params);
   const data= await res.json();

   return data;
}