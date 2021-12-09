import React from "react";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "./validationSchema";
import { registerUserAPI } from "../../../api/user";
import Swal from 'sweetalert2'

interface FormValues {
  nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
  confirmContrasenia: string;
  rol: string;
}

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

export const FormAddUsuario = (): JSX.Element => {
  const initialValues: FormValues = {
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    confirmContrasenia: "",
    rol: "",
  };  

  const onSubmit = async (values: FormValues) => {
    Swal.fire({
      title: 'Confirmar Usuario',
      text: `¿Está seguro que quiere agregar al usuario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí!',
      cancelButtonText: '¡No!',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try{
          const resp = await registerUserAPI(values.nombre, values.apellido, values.email, values.contrasenia, values.confirmContrasenia, values.rol);
          console.log(resp);
    
          if(resp.message == "Creado exitosamente"){
            Swal.fire({
              text: 'Se ha registrado correctamente',
              title: values.nombre.charAt(0).toUpperCase() + values.nombre.slice(1) + " " + values.apellido.charAt(0).toUpperCase() + values.apellido.slice(1),
              icon: 'success'
            }) 
            .then(function() {
              window.location.href = "/Tienda/Perfil";
          });
    
          } else {
            Swal.fire({
              icon: 'error',
              text: 'El correo electrónico ya existe, intente nuevamente.'
            })
          }
        } catch(error: any){
    
        }
      },
    });
  }

  const { width, height } = useWindowDimensions()
  const limite = 1033;

  return (
    <>
      <div className="container-fluid" id="contenedor" style={(width > limite)? (height > 730)? {height: height - 100, display:'flex', alignItems:'center'}: {height: 630, display:'flex', alignItems:'center'} : {} }>
        <section className="jumbotron" id={(width > limite)? "register" : "register_r"}>
          <div className="col" id="columna">
            <div className="container-fluid" id="header">
                <h3 id="header_tittle">
                  Registrar Usuario
                </h3>
            </div> 
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form id="registrar">
                <div className="row" id="fila2">
                </div>
                  <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"}>
                    <div id={(width > limite)? "register_user" : "register_user_responsive"}>  
                      <div className="col-12">
                        <label htmlFor="nombre" id="text">Nombre:</label>
                        <Field className="form-control rounded-pill" name="nombre" type="text" placeholder="Nombre"/> 
                        <div id="fila_unidad">
                          <div>
                            <ErrorMessage name="nombre" component="span" className="form__error"/>
                          </div>    
                        </div>       
                      </div>          
                    </div>
                    <div id={(width > limite)? "register_user" : "register_user_responsive"}>
                      <div className="col-12">
                        <label htmlFor="apellido" id="text">Apellido:</label>
                        <Field className="form-control rounded-pill" name="apellido" type="text" placeholder="Apellido"/>
                        <div id="fila_unidad">
                          <div>
                            <ErrorMessage name="apellido" component="span" className="form__error"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"}>
                    <div id={(width > limite)? "register_user" : "register_user_responsive"}>  
                      <div className="col-12">
                        <label htmlFor="email" id="text">Correo Electrónico:</label>
                        <Field className="form-control rounded-pill" name="email" type="text" placeholder="correo@gmail.com"/>
                        <div id="fila_unidad">  
                          <div>
                            <ErrorMessage name="email" component="span" className="form__error"/>
                          </div>          
                        </div>
                      </div>          
                    </div>
                    <div id={(width > limite)? "register_user" : "register_user_responsive"}>
                      <div className="col-12">
                        <label id="text">Rol:</label>
                        <Field as="select" name="rol" className="form-control rounded-pill" placeholder="Seleccione un rol">
                          <option>Seleccione un rol</option>
                          <option value="administrador">Administrador</option>
                          <option value="vendedor">Vendedor</option>
                        </Field>
                        <div id="fila_unidad">
                          <ErrorMessage name="rol" component="span" className="form__error"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"}>
                    <div id={(width > limite)? "register_user" : "register_user_responsive"}>     
                      <div className="col-12">
                        <label htmlFor="contrasenia" id="text">Contraseña:</label>
                        <Field className="form-control rounded-pill" name="contrasenia" type="password" placeholder="********"/>
                        <div id="fila_unidad">  
                          <div>
                            <ErrorMessage name="contrasenia" component="span" className="form__error"/>
                          </div>          
                        </div>
                      </div>
                    </div>
                    <div id={(width > limite)? "register_user" : "register_user_responsive"}>
                      <div className="col-12">
                        <label htmlFor="confirmContrasenia" id="text">Confirmar Contraseña:</label>
                        <Field className="form-control rounded-pill" name="confirmContrasenia" type="password" placeholder="********"/>  
                        <div id="fila_unidad">
                          <div>
                            <ErrorMessage name="confirmContrasenia" component="span" className="form__error"/>
                          </div>
                        </div>                 
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid" id={(width > limite)? "contenedor_boton" : "contenedor_boton_responsive"}>
                    <button type="submit" id={(width > limite)? "boton_registrar" : "boton_registrar_r"} className="btn btn-primary btn-block btn-lg">Registrar</button>    
                  </div>
              </Form>
            </Formik>
          </div>         
        </section>      
      </div>
    </>
  );
};


