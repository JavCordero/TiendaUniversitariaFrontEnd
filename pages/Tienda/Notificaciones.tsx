import React from 'react';
import { Notificaciones } from '../../components/Notificaciones';

const RealizarVenta= ()=> {
    return(
       <>
          <Notificaciones/>
       </>
    );
 }
 
 export default RealizarVenta;
 
 export async function getStaticProps(context:any) {
    return {
       props: {
          protected: true,
          permissions: ["administrador"]
       }
    };
 }