import Link from "next/link";
import React from "react";
import { FormModificarProductos } from "../../../components/Modificar/FormModificarProductos"
import router, {useRouter} from 'next/router';
import { getIdentificacion } from "../../../api/producto";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from 'sweetalert2';

const ModificarProducto = () => {

  return (
    <> 
      <FormModificarProductos />  
    </>
  );
};

export default ModificarProducto;

export async function getStaticProps(context:any) {
  return {
     props: {
        protected: true,
        permissions: ["administrador","vendedor"]
     }
  };
}
export const getStaticPaths = async () => {
  const res = await getIdentificacion();

  const paths = res.productos.map((producto:any) =>{
    return{
      params: {codigo_interno: producto.toString()}
    }
  })

  return {
    paths,
    fallback: false
  }
}