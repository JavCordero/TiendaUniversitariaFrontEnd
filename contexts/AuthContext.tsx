import React, { createContext, useEffect, useState } from 'react'
import { clearToken, getToken, setToken } from '../api/token';
import { useRouter } from 'next/router';
import { getUserAPI, loginAPI, logoutAPI } from '../api/user';

import { Authenticator } from '../components/Authenticator'; 
import { Loading } from "../components/Loading";
import { Header2 } from "../components/layout/Header2";

// const contextValue= {user, login, reLogin, logout, isAuthenticated};

//definir la información
export interface User {
   name: string;
   email: string;
   rol: string;
   estado: number;
}

export interface AuthContextProps {
   user: any;
   login: (email:string, password:string) => Promise<boolean>;
   logout: ()=> void;
   reLogin: () => Promise<boolean>;
   isAuthenticated: ()=> boolean;
}

export const AuthContext= createContext({} as AuthContextProps);

export default function AuthProvider({children}:any){

   // console.log(children.props.protected);

   const [user, setUser]= useState(null);
   const [ready, setReady]= useState(false);
   const Router = useRouter();

   useEffect(()=> {
      const useEffectAsync= async()=> {
         setReady(false);
         const token= getToken();
         if(token){
            await reLogin();
         }
         setReady(true);
      }
      useEffectAsync();
   }, []);

   // useEffect(()=> {
   //    if(isAuthenticated()){
   //       console.log(children.props.roles)
   //       // if(!children.props.roles.includes(user.rol)){
   //       //    // Router.push("/tienda");
   //       // }
   //    }else{
   //       // Router.push("/");
   //    }
   // }, []);

   const login= async(email:string, password:string)=> {
      try{
         const response= await loginAPI(email, password);
         if(response.user?.estado==1){
            setToken(response.access_token);
            setUser(response.user);
            return true;
         }else{
            return false;
         }
      }catch(error){
         console.log(`ERROR: ${error}`);
         return false;
      }
   }

   const logout= async()=> {
      try{
         const response= await logoutAPI();
         clearToken();
         setUser(null);
         sessionStorage.clear();
         return true;
      }catch(error){
         console.log(`ERROR: ${error}`);
      }
   }

   const reLogin= async()=> {
      try{
         const response= await getUserAPI();
         if(response.estado==1){
            setUser(response);
            return true;
         }else{
            return false;
         }
      }catch(error){
         return false;
      }
   }

   const isAuthenticated= ()=> {
      if(user!=null){
         return true;
      }else{
         return false;
      }
   }

   const contextValue= {user, login, logout, reLogin, isAuthenticated};
   
   const tienda= (
      <AuthContext.Provider value={contextValue}>
         <Authenticator>
            {children}
         </Authenticator>
      </AuthContext.Provider>
   );

   return ready ? tienda : <><Loading/><Header2></Header2></>;
}