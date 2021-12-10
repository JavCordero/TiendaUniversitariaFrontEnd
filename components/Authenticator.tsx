import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import router, { useRouter } from 'next/router';
import { Header } from "../components/layout/Header";
import { Header2 } from "../components/layout/Header2";
import { Loading } from "../components/Loading";

export const Authenticator= ({children}: any)=> {
   console.log("Authentication");

   const {user, isAuthenticated}= useAuth(); 
   const Router = useRouter();

   if(children.type.name=="ModificarProducto"){
      const isProtected= true;
      const permissions= ["administrador"];
      if(isProtected){ // pagina privada
         if(isAuthenticated()){ // credenciales de usuario
            if(permissions.includes(user.rol)){ // permisos suficientes
               return(
               <Header>
                  {children}
               </Header>);
            }else{ // permisos insuficientes
               Router.push("/Tienda/Perfil");
            }
         }else{ // sin credenciales de usuario
            Router.push("/");
         }
      }else{ //pagina publica
         return(
            <Header2>
               {children}
            </Header2>);
      }
      return null;
      // return <><Loading/><Header2></Header2></>
   }else{
      const isProtected= children.props.protected;
      const permissions= children.props.permissions;
   
      if(isProtected){ // pagina privada
         if(isAuthenticated()){ // credenciales de usuario
            if(permissions.includes(user.rol)){ // permisos suficientes
               return(
               <Header>
                  {children}
               </Header>);
            }else{ // permisos insuficientes
               Router.push("/Tienda/Perfil");
            }
         }else{ // sin credenciales de usuario
            Router.push("/");
         }
      }else{ //pagina publica
         return(
            <Header2>
               {children}
            </Header2>);
      }
      return null;
      // return <><Loading/><Header2></Header2></>
   }
}