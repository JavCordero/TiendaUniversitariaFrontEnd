import React, {useEffect , useState} from 'react';
import { BsBellSlashFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

import { getNotificaciones, deleteNotificaciones } from '../api/Notificaciones';

export const Notificaciones = () =>{

    const [notificaciones, setNotificaciones] = useState(new Array);

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

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageXOffset;
        setScrollPosition(position);
    };

    
    const { width, height } = useWindowDimensions()
    const limite = 900;
    

    function eliminarNotificacion(id:any){
        Swal.fire({
            title: '¿Eliminar Notificación?',
            text: `¿Está seguro que quiere eliminar la notificación?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, elíminalo!',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
                deleteNotificaciones(id);
                Swal.fire({
                    title: 'Eliminación exitosa',
                    text:  'La notificación ha sido eliminada de su bandeja.',
                    icon:  'success',
                    willClose: () => {
                        getNotificaciones().then(data => setNotificaciones(data));
                      }
                    }
                );
            }
        })
    }

    useEffect(() => {
        getNotificaciones().then(data => setNotificaciones(data));
    }, []);

    return(
        <div className="container-fluid" id="contenedor" style={{width:width, height: height - 100, marginLeft:'0'}}>
            <div className="col" style={{paddingLeft:'0', paddingRight:'0', paddingTop:'50px'}}>
            <div className="container-fluid" id="contenedor_lista" style={{height:'50px', marginTop:'50px', width:'1110px', display:'flex', alignItems:'center', justifyContent:'center'}}> 
                <div className="row justify-content-center" style={{width:'1080px', height:'50px', display:'flex', marginLeft:'15px', marginRight:'15px', backgroundColor:'#425563', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}>
                    <div id="header_lista" style={{width:'180px', height:'50px'}}>
                        <h2>
                            Notificaciones
                        </h2>
                    </div>
                </div>
            </div>
                {
                    notificaciones.map((notificacion) => {
                        return(
                            <div key={notificacion.id} className="container-fluid" id="contenedor_lista" style={{height:'100px', width:'1110px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <div className="row" id="fila_lista" style={{height:'100px', width:'1080px', marginLeft:'15px', marginRight:'15px'}}>
                                    <div className="col-9 p-3" id="elementos_lista">
                                        <h5>
                                            Se ha detectado el stock crítico ({notificacion.data.stock_critico}) para el siguiente producto: {notificacion.data.nombre},
                                            La cantidad del producto es: {notificacion.data.cantidad} unidades, por favor reponer stock.  
                                        </h5>
                                    </div>

                                    <div className="col-3" id="elementos_lista">
                                        <button type="submit" onClick={() => eliminarNotificacion(notificacion.id)} className="btn btn-primary btn-block btn-lg" id="boton_notificacion" style={{height:'40px', width:'160px', display:'flex', alignItems:'center', justifyContent:'center'}}>     
                                            <BsBellSlashFill style={{pointerEvents:'none'}}/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        );
                    })
                }
            </div>
        </div>
    );
}