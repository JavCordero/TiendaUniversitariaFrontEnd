import React, { useState } from 'react'
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import styles from '../styles/Home.module.css';
import { FaLock, FaUser, FaAt } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { Loading } from "../components/Loading";
import { Header2 } from "../components/layout/Header2";

// fuente del form: https://bootsnipp.com/snippets/a6Pdk

function useWindowDimensions() {
   const [width, setWidth] = React.useState(window.innerWidth);
   const [height, setHeight] = React.useState(window.innerHeight);
 
   const updateWidthAndHeight = () => {
     setWidth(window.innerWidth);
     setHeight(window.innerHeight);
   };
 
   React.useEffect(() => {
     window.addEventListener("resize", updateWidthAndHeight);
     return () => window.removeEventListener("resize", updateWidthAndHeight);
   });
 
   return {
     width,
     height,
   }
 }

const Home= ()=> {
   const Router = useRouter();
   const {user, login, isAuthenticated}= useAuth();
   const [alerta, setAlerta]= useState(false);

   const formInitialValues= {
      email: "",
      password: ""
   }
   const [formValues, setFormValues]= useState(formInitialValues);
   const {email, password}= formValues;

   const handleChangeForm= (e:any)=> {
      setFormValues({
         ...formValues,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit= async (e:any)=> {
      e.preventDefault();
      const resp= await login(email, password);
      
      if(resp){
         console.log("user authenticated");
         setAlerta(false);
      }else{
         console.log("invalid credentials");
         setAlerta(true);
         Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Datos inválidos al iniciar sesión, intente de nuevo.'
         })
      }
   }

   const { width, height } = useWindowDimensions()

   const tienda = (
      <>
      {/* <div className="background-image"></div> */}
      <div className="container-fluid" style={(height > 530)? {height: height - 100, display:'flex', alignItems:'center', justifyContent:'center'}: {height: 430, display:'flex', alignItems:'center', justifyContent:'center'}}>
         <div className="card" id="login_user">
                     <h5 className="card-header text-center" id="header" style={{height: 50}}>
                        Tienda Universitaria UCN
                     </h5>
                     <div className="card-body p-1">
                        <img id="profile-img" className="profile-img-card" src="/images/logo-ucn.png" sizes="100"/>
                        <form
                           onSubmit={handleSubmit}
                           autoComplete="off"
                        >
                           <div className="form-group px-5">
                              <div className="input-group mt-3">
                                 <div className="input-group-prepend">
                                    <span className="input-group-text"><FaUser/></span>
                                 </div>
                                 <input type="text" className="form-control" name="email" placeholder="Correo electrónico" value={email} onChange={handleChangeForm} />
                              </div>
                              <div className="input-group mt-3">
                                 <div className="input-group-prepend">
                                    <span className="input-group-text"><FaLock/></span>
                                 </div>
                                 <input type="password" className="form-control" name="password" placeholder="Contraseña" value={password} onChange={handleChangeForm}/>
                              </div>
                              <button type="submit" className="btn btn-block mt-4" id="boton_registrar">Entrar</button>
                           </div>
                        </form>
                     </div>
         </div>   
      </div>
      </>
   );

   if(isAuthenticated()){
      Router.replace("/Tienda/Perfil");
   }else{
      return tienda;
   }
   return null;
}

export default Home;

export async function getStaticProps(context:any) {
   return {
      props: {
         protected: false,
         permissions: []
      }
   };
}