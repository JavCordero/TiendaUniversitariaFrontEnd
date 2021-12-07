import React from "react";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "./validationSchema";
import { registerProductAPI } from "../../../api/producto";
import Swal from 'sweetalert2'

interface FormValues {
  nombre: string;
  precio: string;
  stockActual: string;
  stockCritico: string;
  categoria: string;
  descripcion: string;
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

export const FormAddProducto = (): JSX.Element => {
  const initialValues: FormValues = {
    nombre: "",
    precio: "",
    stockActual: "",
    stockCritico: "",
    categoria: "",
    descripcion: "",
  };  

  const onSubmit = async (values: FormValues) => {
    try{
    const resp = await registerProductAPI(values.nombre, values.descripcion,  values.precio, values.stockActual, values.stockCritico, values.categoria);
    console.log(values);

      if(resp.message == "Creado exitosamente"){
        
        Swal.fire({
          text: 'El producto se ha registrado correctamente.',
          title: values.nombre.charAt(0).toUpperCase() + values.nombre.slice(1),
          icon: 'success'
        })
        .then(function() {
          window.location.href = "/Tienda/ListaProductos";
      });

      } else {
        if(resp.message == "Error de validacion"){
          Swal.fire({
            icon: 'error',
            text: 'El producto no se ha podido registrar, intente de nuevo.'
          })
        }
        
      }
    } catch(error: any){

    }
  }

  const { width, height } = useWindowDimensions()
  const limite = 1033;

  return (
    <>
      <div className="container-fluid" id="contenedor" style={(width > limite)? (height > 850)? {height: height - 100, display:'flex', alignItems:'center'}: {height: 750, display:'flex', alignItems:'center'} : {} }>
        <section className="jumbotron" id={(width > limite)? "register2" : "register2_r"}>
          <div className="col" id="columna">
            <div className="container-fluid" id="header">
                <h3 id="header_tittle">
                  Registrar Producto
                </h3>
            </div> 
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form id="registrar">
                <div className="row" id={(width > limite)? "" : "fila2_p"}>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}>  
                    <div className="col-12">
                      <label htmlFor="nombre" id="text">Nombre:</label>
                      <Field className="form-control rounded-pill" name="nombre" type="text" placeholder="Nombre del producto"/>
                      <div id="fila_unidad_p">  
                        <div>
                          <ErrorMessage name="nombre" component="span" className="form__error"/>
                        </div>          
                      </div>
                    </div>          
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}>
                    <div className="col-12">
                    <label htmlFor="precio" id="text">Precio:</label>
                      <Field className="form-control rounded-pill" name="precio" type="text" placeholder="0"/>
                      <div id="fila_unidad_p">
                        <div>
                          <ErrorMessage name="precio" component="span" className="form__error"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}>  
                    <div className="col-12">
                      <label htmlFor="stockActual" id="text">Stock Actual:</label>
                      <Field className="form-control rounded-pill" name="stockActual" type="text" placeholder="0"/>
                      <div id="fila_unidad_p">  
                        <div>
                          <ErrorMessage name="stockActual" component="span" className="form__error"/>
                        </div>          
                      </div>
                    </div>          
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}>
                    <div className="col-12">
                      <label htmlFor="stockCritico" id="text">Stock Crítico:</label>
                      <Field className="form-control rounded-pill" name="stockCritico" type="text" placeholder="0"/>
                      <div id="fila_unidad_p">
                        <div>
                          <ErrorMessage name="stockCritico" component="span" className="form__error"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col2"}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}>     
                    <div className="col-12">
                      <label id="text">Categoría:</label>
                      <Field as="select" name="categoria" className="form-control rounded-pill" placeholder="Seleccione un rol">
                        <option selected>Seleccione una categoría</option>
                        <option value="001">Vestuario</option>
                        <option value="002">Artículos de librería</option>
                        <option value="003">Regalos institucionales</option>
                        <option value="004">Libros</option>
                        <option value="005">Varios</option>
                      </Field>
                      <div id="fila_unidad_p">  
                        <div>
                          <ErrorMessage name="categoria" component="span" className="form__error"/>
                        </div>          
                      </div>
                    </div>
                  </div>
                  <div id={(width > limite)? "register_product" : ""}>
                  </div>
                </div>
                <div className={(width > limite)? "container-fluid" : "col"} id={(width > limite)? "contenedor_descripcion" : "register_product_responsive"}>
                  <div className="col-12">
                    <label htmlFor="descripcion" id="text">Descripción</label>
                    <Field name="descripcion" as="textarea" className="form-control rounded-3" rows="3" placeholder="Ingrese una descripción del producto"></Field>
                    <div id="fila_unidad_p">  
                      <div>
                        <ErrorMessage name="descripcion" component="span" className="form__error"/>
                      </div>          
                    </div>
                  </div>
                </div>
                <div className="container-fluid" id={(width > limite)? "contenedor_boton" : "contenedor_boton_responsive"}>
                  <button type="submit" id="boton_registrar" className="btn btn-primary btn-block btn-lg">Registrar</button>    
                </div>
              </Form>
            </Formik>
          </div>         
        </section>      
      </div>
    </>
  );
};


