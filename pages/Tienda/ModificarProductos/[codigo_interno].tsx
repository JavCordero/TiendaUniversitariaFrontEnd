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
