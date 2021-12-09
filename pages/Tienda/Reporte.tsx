import React from 'react'
import IndexReporte from '../../components/Reporte/IndexReporte'

const Reporte = () =>{
    return (
        <div>
            <IndexReporte />
        </div>
    )
}

export default Reporte

export async function getStaticProps(context:any) {
    return {
       props: {
          protected: true,
          permissions: ["administrador", "vendedor"]
       }
    };
  }