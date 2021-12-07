import {getToken, setToken, clearToken} from '../api/token';

const API_PATH= "http://127.0.0.1:8000/api";

export const registrarVenta = async (productos:any)=>{
    const url= `${API_PATH}/ventas/masiva`;
    const params= {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
       },
       body: JSON.stringify(productos)
    }
    console.log(params);
    const res= await fetch(url, params);
    const data= await res.json();
    console.log(data);
    return data;
}