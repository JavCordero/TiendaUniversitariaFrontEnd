import { getToken, setToken, clearToken } from '../api/token';

const API_PATH = "http://127.0.0.1:8000/api";

export const getCategory = async (categoria: string) => {
   const url = `${API_PATH}/correlativo-categorias/${categoria}`;
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

export const getIdentificacion= async()=> {
   const url= `${API_PATH}/identificacion-productos/`;
   const params= {
      method: "GET",
      headers: {
         "Content-Type": "application/json"
      },
   }
   const res= await fetch(url, params);
   const data= await res.json();
   console.log(data);
   return data;
}

export const getProductosEspecifico= async(id: string)=> {

   const url= `${API_PATH}/productos/${id}`;
   const params= {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
   }
   const res= await fetch(url, params);
   const data= await res.json();
   console.log(data);
   return data;
}

export const updateProducto= async(id: string, rebajaMerma: string, aumento: string)=> {

   // Obtiene el producto
   const producto = await getProductosEspecifico(id);
   var cantidadActual = producto.producto.cantidad;
   var cantidadModificar = 0;

   if(rebajaMerma == "0" && aumento != "0"){
      cantidadActual = cantidadActual + parseInt(aumento);
      cantidadModificar = parseInt(aumento);
   }
   if(rebajaMerma != "0" && aumento == "0"){
      var rebaja = cantidadActual - parseInt(rebajaMerma);
      if (rebaja < 0){
         return "Rebaja invalida";
      }else{
         cantidadActual= rebaja; 
      }
   }
   console.log()
   const url= `${API_PATH}/productos/${id}/${cantidadModificar}`;
   const params= {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
         nombre: producto.producto.nombre,
         descripcion: producto.producto.descripcion,
         codigo_interno: producto.producto.codigo_interno,
         codigo_barra: producto.producto.codigo_barra,
         categoria: producto.producto.categoria,
         imagen: "",
         precio: parseInt(producto.producto.precio),
         cantidad: parseInt(cantidadActual),
         stock_critico: parseInt(producto.producto.stock_critico),
      })
   }
   const res= await fetch(url, params);
   const data= await res.json();
   console.log(data);
   return data;
}

export const getProductos= async()=> {
   const url= `${API_PATH}/productos`;
   const params= {
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
export const getProducto = async (id: string) => {
   const url = `${API_PATH}/productos/${id}`;
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

export const getVentas = async () => {
   const url = `${API_PATH}/ventas`;
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
export const getEntradas = async () => {
   const url = `${API_PATH}/entradas`;
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

export const registerProductAPI = async (nombre: string, descripcion: string, precio: string, stockActual: string, stockCritico: string, categoria: string) => {
   var capitalizeNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
   var producto = capitalizeNombre[0]; // Obtiene el primer caracter del produco
   var producto2 = capitalizeNombre[1]; // Obtiene el segundo caracter del producto

   // Obtiene el correlativo de la categoria buscada
   const numeroCorrelativo = await getCategory(categoria);
   const numeroCorrelativo2 = parseInt(numeroCorrelativo) + 1;
   var numeroCorrelativo3;
   var barra = "";
   var barra2 = "";

   console.log(numeroCorrelativo)

   if (numeroCorrelativo2 < 10) {
      numeroCorrelativo3 = "000" + numeroCorrelativo2;
   }
   else if (numeroCorrelativo2 < 100) {
      numeroCorrelativo3 = `00${numeroCorrelativo2}`;
   }
   else if (numeroCorrelativo2 < 1000) {
      numeroCorrelativo3 = `0${numeroCorrelativo2}`;
   }
   else {
      numeroCorrelativo3 = `${numeroCorrelativo2}`;
   }

   var codigo = producto.charCodeAt(0); // Obtiene en ASCII el primer valor del caracter. 
   var codigo2 = producto2.charCodeAt(0); // Obtiene en ASCII el segundo valor del caracter. 

   // Se cambia el codigo para que calce con el codigo de barra
   if (codigo < 100) {
      barra = `0${codigo}`;
   }
   else {
      barra = `${codigo}`;
   }
   if (codigo2 < 100) {
      barra2 = `0${codigo2}`;
   }
   else {
      barra2 = `${codigo2}`;
   }

   var codigoInterno = categoria + '-' + numeroCorrelativo3; // Aca hay que obtener el ultimo valor de dicha categoria y sumarle uno (hacer un get), forma: 002-0001.
   var codigoBarra = barra + barra2 + categoria + numeroCorrelativo3; // hay que hacer que tenga un largo de 13, forma, ejemplo: Poleron: P = 80 en ASCII O = 111 en ASCII -> 0801110020001 (13 maximo)

   const url = `${API_PATH}/productos`;
   const params = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
         nombre: capitalizeNombre,
         descripcion: descripcion,
         codigo_interno: codigoInterno,
         codigo_barra: codigoBarra,
         categoria: categoria,
         imagen: "",
         precio: parseInt(precio),
         cantidad: parseInt(stockActual),
         stock_critico: parseInt(stockCritico),
      })
   }
   const res = await fetch(url, params);
   const data = await res.json();
   return data;
}

export const getVentasReportes = async (tipo: any) => {
   const url = `${API_PATH}/ventas/reportes?filtro=${tipo}`;
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

export const getVentasTop = async (limit: any) => {
   const url = `${API_PATH}/ventas/top?limit=${limit}`;
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

export const getVentasBottom = async (limit: any) => {
   const url = `${API_PATH}/ventas/bottom?limit=${limit}`;
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

export const getEntradasReportes = async () => {
   const url = `${API_PATH}/entradas/reportes`;
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

export const getEntradasReportesFiltro = async (tipo: any) => {
   const url = `${API_PATH}/entradas/rotacion?filtro=${tipo}`;
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