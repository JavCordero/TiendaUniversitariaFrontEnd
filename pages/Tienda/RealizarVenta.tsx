import React from 'react'
import { Venta } from '../../components/Venta';

const RealizarVenta= ()=> {
   return(
      <>
         <Venta/>
      </>
   );
}

export default RealizarVenta;

export async function getStaticProps(context:any) {
   return {
      props: {
         protected: true,
         permissions: ["administrador","vendedor"]
      }
   };
}