import React, { useState,useEffect } from "react";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "./validationSchema";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import {  getProductosEspecifico, updateProducto } from "../../api/producto";
import { TextField } from "@material-ui/core";
import { BsSearch } from "react-icons/bs";

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

export const FormModificarProductos = (): JSX.Element => {
  const initialValues: FormValues = {
    nombre: "",
    precio: "",
    stockActual: "",
    stockCritico: "",
    categoria: "",
    descripcion: "",
  };  
  /* console.log(values);
  console.log("nombre"+nombre+"SC"+stock_critico+"SA"+stock_actual+"D"+descripcion+"P"+precio+"CB"+codigo_barra+"CI"+codigo_interno)
  console.log(aumento+" ----"+rebajaMerma) */

  const onSubmit = async (values: FormValues) => {

    const select = (document.getElementById("exampleFormControlSelect1") as HTMLSelectElement).value;
    console.log(select);
    if(select === "0"){
      Swal.fire({
        icon: 'error',
        text: 'No ha ingresado ninguna opción, intente de nuevo.'
      })
    }
    else{
      if(aumento == 0 && rebajaMerma == 0 ){
        Swal.fire({
          icon: 'warning',
          text: 'La cantidad a disminuir/aumentar es 0.'
        })
      }
      else{
        Swal.fire({
          title: 'Confirmar Cambio',
          text: `¿Está seguro que quiere agregar modificar la cantidad del producto ${nombre}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí!',
          cancelButtonText: '¡No!',
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try{
              const resp = await updateProducto(String(codigo_interno),String(rebajaMerma),String(aumento));
              console.log(resp);
                if(resp.message == "Actualizado exitosamente"){
                  
                  Swal.fire({
                    text: 'El producto se ha modificado correctamente.',
                    title: String(nombre),
                    icon: 'success'
                  })
                  .then(function() {
                    window.location.href = "/Tienda/ListaProductos";
                });
          
                } else {
                  if(resp.message == "Error de validacion"){
                    Swal.fire({
                      icon: 'error',
                      text: 'El producto no se ha podido modificar, intente de nuevo.'
                    })
                  } else {
                    if(resp == "Rebaja invalida"){
                      Swal.fire({
                        icon: 'error',
                        title: 'Rebaja inválida',
                        text: 'El producto no se ha podido modificar, intente de nuevo.'
                      })
                    }
                  }
                }
              } 
              catch(error: any){
                Swal.fire({
                  icon: 'error',
                  text: 'El producto no se ha podido modificar, intente de nuevo.'
                })
              }
            }
        });
      }
    }
  }

  const { width, height } = useWindowDimensions()
  const limite = 1033;


  const [stock_actual, setStockActual] = useState();
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precio, setPrecio] = useState();
  const [stock_critico, setStockCritico] = useState();
  const [codigo_barra, setCodigoBarra] = useState();
  const [codigo_interno, setCodigoInterno] = useState();
  const router = useRouter();

  const fetchProducts = async () => {
    const codigoInterno = String(router.query.codigo_interno);
    const data = await getProductosEspecifico(codigoInterno);
    setNombre(data.producto.nombre);
    setStockActual(data.producto.cantidad);
    setDescripcion(data.producto.descripcion);
    setPrecio(data.producto.precio);
    setStockCritico(data.producto.stock_critico);
    setCodigoBarra(data.producto.codigo_barra);
    setCodigoInterno(data.producto.codigo_interno);

  }
  
  useEffect(() => {
    fetchProducts()
  }, []);

  const [rebajaMerma,setRebajaMerma] = useState(0);
  const [aumento,setAumento] = useState(0);
  const [select,setSelect] = useState("");

  function handleSelect(value:string){
   setRebajaMerma(0);
   setAumento(0);
   setSelect(value);
   console.log(value);
  }

  return (
    <>
      <div className="container-fluid" id="contenedor" style={(width > limite)? (height > 850)? {height: height - 100, display:'flex', alignItems:'center'}: {height: 750, display:'flex', alignItems:'center'} : {} }>
        <section className="jumbotron" id={(width > limite)? "register2" : "register2_r2"} >
          <div className="col" id="columna">
            <div className="container-fluid" id="header">
                <h3 id="header_tittle">
                  Modificar producto
                </h3>
            </div> 
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form id="registrar">
                <div className="row" id={(width > limite)? "" : "fila2_p"}  style={{height: '40px'}}>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"} style={width>limite?{height: '100px'}:{height: '200px'}}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>  
                    <div className="col-12">
                      <label htmlFor="nombre" id="text">Nombre:</label>
                      <input className="form-control rounded-pill" type="text" placeholder={nombre} readOnly></input>
                    </div>          
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>
                    <div className="col-12">
                    <label htmlFor="precio" id="text">Precio:</label>
                    <input className="form-control rounded-pill" type="text" placeholder={precio} readOnly></input>
                    </div>
                  </div>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"} style={width>limite?{height: '100px'}:{height: '200px'}}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}} >  
                    <div className="col-12">
                      <label htmlFor="stockActual" id="text">Stock Actual:</label>
                      <input className="form-control rounded-pill" type="text" placeholder={stock_actual} readOnly></input>
                    </div>          
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>
                    <div className="col-12">
                      <label htmlFor="stockCritico" id="text">Stock Crítico:</label>
                      <input className="form-control rounded-pill" type="text" placeholder={stock_critico} readOnly></input>
                    </div>
                  </div>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col2"} style={width>limite?{height: '100px'}:{height: '200px'}}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>     
                    <div className="col-12">
                      <label htmlFor="codigoBarras" id="text">Código de Barras:</label>
                      <input className="form-control rounded-pill" type="text" placeholder={codigo_barra} readOnly></input>
                    </div>
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>
                    <div className="col-12">
                      <label htmlFor="codigoInterno" id="text">Código Interno:</label>
                      <input className="form-control rounded-pill" type="text" placeholder={codigo_interno} readOnly></input>
                    </div>
                  </div>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col"} style={width>limite?{height: '100px'}:{height: '200px'}}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>     
                    <div className="col-12">
                      <label htmlFor="descripcion" id="text">Descripción:</label>
                      <input className="form-control rounded-pill" type="text" placeholder={descripcion} readOnly></input>
                    </div>
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}  style={width>limite?{}:{height: '100px'}}>
                    <div className="col-12">
                    <label id="text">Rebajar/Aumentar stock:</label>
                    <select className="form-control rounded-pill" id="exampleFormControlSelect1" onChange={(e) => {handleSelect(((e.target).value));}}>
                        <option value="0">Seleccione una opción</option>
                        <option value="1">Rebajar por merma</option>
                        <option value="2">Aumentar cantidad</option>
                    </select>
                    </div>
                  </div>
                </div>
                <div className={(width > limite)? "row" : "col"} id={(width > limite)? "fila" : "col2"} style={width>limite?{height: '100px'}:{height: '100px'}}>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"} style={width>limite?{}:{height: "0px"}}>     
                    <div className="col-12">
                    </div>
                  </div>
                  <div id={(width > limite)? "register_product" : "register_product_responsive"}>
                    <div className="col-12">
                      {select != "1" && select != "2" &&
                        <p style={{height: "100px"}}></p>
                      }
                      {select === "1"  &&
                        <div className="col-12" style={{height: "100px"}}>
                          <label htmlFor="rebajaMerma" id="text">Ingrese la cantidad por rebajar:</label>
                          <input
                            className="form-control rounded-pill"
                            //variant="outlined"
                            placeholder="0"
                            key="random1"
                            value={rebajaMerma}
                            onChange={(e) => e.target.value === "" ? setRebajaMerma(0): setRebajaMerma( parseInt(e.target.value) )}
                            />
                          <div id="fila_unidad_p">  
                            <div>
                              <ErrorMessage name="rebajaMerma" component="span" className="form__error"/>
                            </div>          
                          </div>
                        </div>          
                        
                      }
                      {select === "2"  &&
                        <div className="col-12" style={{height: "100px"}}>
                        <label htmlFor="aumento" id="text">Ingrese la cantidad por aumentar:</label>
                        <input
                            className="form-control rounded-pill"
                            //variant="outlined"
                            placeholder="0"
                            key="random1"
                            value={aumento}
                            onChange={(e) => e.target.value === "" ? setAumento(0): setAumento(parseInt(e.target.value))}
                            />
                        <div id="fila_unidad_p">  
                          <div>
                            <ErrorMessage name="aumento" component="span" className="form__error"/>
                          </div>          
                        </div>
                      </div>  
                      }

                    </div>
                  </div>
                </div>

                <div className="container-fluid" id={(width > limite)? "contenedor_boton" : "contenedor_boton_responsive"} >
                  <button type="submit" id="boton_registrar" className="btn btn-primary btn-block btn-lg">Modificar</button>    
                </div>
              </Form>
            </Formik>
          </div>         
        </section>      
      </div>
    </>
  );
};