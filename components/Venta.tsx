import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { ImCancelCircle } from "react-icons/im";

import { registrarVenta } from '../api/ventas';


export const Venta = (): JSX.Element =>{

    const Router = useRouter();

    const [productos,setProductos] = useState(new Array);

    //elemento que se elimina de la vista de la venta
    const [productoEliminado, setProductoEliminado] = useState({});
    

    //para re-renderizar los productos crear su nuevo componente que es cada fila
    //const [productoCantidad,setProductoCantidad] = useState({});

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

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const { width, height } = useWindowDimensions()
    const limite = 900;
    
    function getProductosCarro(){

        const array = new Array;

        if(sessionStorage.length != 0){
            
            for(var i = 0; i<sessionStorage.length; i++){
                const clave = sessionStorage.key(i)!;
                //obtiene el Json, lo transforma y lo mete en productos
                array.push(JSON.parse(sessionStorage.getItem(clave)!)); 
            }

            setProductos(array);
            
        }
    };

    function putProductosCarro(producto: any){
        sessionStorage.setItem(`Producto ${producto.codigo_interno}`,JSON.stringify(producto));
    }

    /*
    function deleteProductoCarro(producto: any){
        sessionStorage.removeItem(`Producto ${producto.codigo_interno}`);
    }
    */

    function aumentarProducto(i:number){

        const productosAux = productos;

        if(productosAux[i].cantidad<productosAux[i].cantidad_actual){
            productosAux[i].cantidad = productosAux[i].cantidad+1;
            putProductosCarro(productosAux[i]);
            getProductosCarro();
            console.log(productos);
        }

    }

    function disminuirProducto(i:number){

        const productosAux = productos;

        if(productos[i].cantidad>1){
            productosAux[i].cantidad = productos[i].cantidad-1;
            putProductosCarro(productosAux[i]);
            getProductosCarro();
            console.log(productos);
        }

    }

    function eliminarProducto(i:number,id:number){

        Swal.fire({
            title: '¿Seguro?',
            text: `¿Está seguro que quiere eliminar el producto ${productos[i].nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, elíminalo!',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
                const productosSinEliminar = productos.filter(producto => producto.codigo_interno != id);
                sessionStorage.removeItem(`Producto ${id}`);
                setProductos(productosSinEliminar);
                setProductoEliminado(productos[i]);
                Swal.fire(
                    'Eliminación exitosa',
                    'El producto ha sido eliminado de la selección.',
                    'success'
                )
            }
        })
        
    }

    async function realizarVenta(){

        const resp = await registrarVenta(productos);
        let productosMalos = false;
        let stringMalito = "Se detectaron inconsistencias en el stock de los siguientes productos: "
        let stringBueno = "Estos son los productos que se pudieron registrar en la venta";

        console.log(resp);
        sessionStorage.clear();

        resp.forEach((respuesta : any) => {
            const respuestaNegativa = respuesta.message.includes("No");
            if(respuestaNegativa){
                productosMalos = true;
                stringMalito = `${stringMalito} ${respuesta.nombre}. `;
            }
            else{
                stringBueno = `${stringBueno} ${respuesta.nombre}. `;
            }
        });
        
        if(productosMalos){
            Swal.fire({
                icon: 'warning',
                title: 'Se detectaron inconsistencias',
                text: stringMalito
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Venta Exitosa',
                    text: stringBueno
                }).then(() => {
                    Router.push("/Tienda/Perfil");
                });
            });
        }
        
        else{
            Swal.fire({
                icon: 'success',
                title: 'Venta Exitosa',
                text: 'La venta se ha realizado con éxito.'
            }).then(() => {
                Router.push("/Tienda/Perfil");
            });
        }
        
    }

    //si se elimina un producto se simula el efecto para re-renderizarlo
    
    useEffect(() => {
        //saltara una alerta, implementar despues
        console.log("hola");
    }, [productos]); 
    

    //si se elimina un producto se simula el efecto para re-renderizarlo
    useEffect(() => {
        //saltara una alerta, implementar despues
        console.log(productos);
    }, [productoEliminado]); 
    

    useEffect(() => {
        getProductosCarro();
    }, []);       


    return (
        <>
            <div className="container-fluid" id="contenedor" style={{width:width, height: height - 100, marginLeft:'0'}}>
                <div className="col" style={{paddingLeft:'0', paddingRight:'0', paddingTop:'50px'}}>
                
                <div className="container-fluid" id="contenedor_lista" style={{height:'50px', marginTop:'50px', width:'1110px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="row" style={{width:'1080px', height:'50px', display:'flex', marginLeft:'15px', marginRight:'15px', backgroundColor:'#425563', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}>
                        <div id="header_lista" style={{width:'180px', height:'50px'}}>
                            <h2 id="text_lista">
                                Nombre
                            </h2>
                        </div>

                        <div id="header_lista" style={{width:'180px'}}>
                            
                            <h2 id="text_lista">
                                Stock Actual
                            </h2>

                        </div>

                        <div id="header_lista" style={{width:'180px'}}>
                            
                            <h2 id="text_lista">
                                Cantidad Producto
                            </h2>
                        </div>

                        <div id="header_lista" style={{width:'180px'}}>
                            
                            <h2 id="text_lista">
                                Disminuir Cantidad
                            </h2>
                            
                        </div>

                        <div id="header_lista" style={{width:'180px'}}>
                            
                            <h2 id="text_lista">
                                Aumentar Cantidad
                            </h2>
                            
                        </div>

                        <div id="header_lista" style={{width:'180px'}}>
                            
                            <h2 id="text_lista">
                                Remover
                            </h2>
                            
                        </div>
                    
                        </div>
                    </div>

                     {/*<div className="row" style={{width:'1080px', height:'50px', display:'flex', marginLeft:'15px', marginRight:'15px', backgroundColor:'#425563', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}>*/}
                        {
                            productos.map((producto)=>{
                                return(
                                    <div className="container-fluid" id="contenedor_lista" style={{height:'100px', width:'1110px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <div className="row" key={producto.codigo_interno} id="fila_lista" style={{height:'100px', width:'1080px', marginLeft:'15px', marginRight:'15px'}}>
                                            <div style={{width:'180px'}}>
                                                <h2 id="text_lista" style={{width:'180px', height:'100px', paddingLeft:'20px', display:'flex', alignItems:'center'}}>
                                                    {producto.nombre}
                                                </h2>
                                            </div>
                                            <div style={{width:'180px'}}>
                                                <h2 id="text_lista" style={{width:'180px', height:'100px', paddingLeft:'80px', display:'flex', alignItems:'center'}}>
                                                    {producto.cantidad_actual}
                                                </h2>
                                            </div>
                                            <div style={{width:'180px'}}>
                                                <h2 id="text_lista" style={{width:'180px', height:'100px', paddingLeft:'80px', display:'flex', alignItems:'center'}}>
                                                    {producto.cantidad}
                                                </h2>
                                            </div>
                                            <div id="elementos_lista" style={{width:'180px'}}>
                                                <button type="submit" value={productos.indexOf(producto)} onClick={(e) => {disminuirProducto(parseInt((e.target as HTMLButtonElement).value));}} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'40px', width:'130px', display:'flex', alignItems:'center', justifyContent:'center'}}>                      
                                                    -      
                                                </button>
                                            </div>
                                            <div id="elementos_lista" style={{width:'178px'}}>
                                                <button type="submit" value={productos.indexOf(producto)} onClick={(e) => {aumentarProducto(parseInt((e.target as HTMLButtonElement).value));}} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'40px', width:'130px', display:'flex', alignItems:'center', justifyContent:'center'}}>     
                                                    +
                                                </button>
                                            </div>
                                            <div id="elementos_lista" style={{width:'178px'}}>
                                                <button type="submit" value={productos.indexOf(producto)} onClick={(e) => {eliminarProducto(parseInt((e.target as HTMLButtonElement).value),producto.codigo_interno);}} id="boton_cancelar" className="btn btn-primary btn-block btn-lg" style={{height:'40px', width:'130px', display:'flex', alignItems:'center', justifyContent:'center'}}>     
                                                    <ImCancelCircle style={{pointerEvents:'none'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    <div style={{height:'50px'}}>

                    </div>
                    
                    <div className="container-fluid" id="contenedor_lista" style={{height: width > limite? '50px': '100px', width:'100%', maxWidth:'1470px', marginLeft:'0', marginRight:'0'}}>
                        <div className={width > limite? "row":"col"} style={{height: width > limite? '50px': '100px', width:((width * 0.7)), position:'relative', marginLeft: (width*0.15) + scrollPosition - (55/2), marginRight: (width*0.15) + 55}}>
                            <div style={width > limite? {width:'300px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}:{width:'100%', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>

                                <button type="submit" onClick={() => Router.push("/Tienda/ListaProductos")} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'40px', width:'260px', display:'flex', alignItems:'center', justifyContent:'center'}}>     
                                    <h2 id="text_lista" style={{color:'white', fontWeight:'bold'}}>
                                        Añadir más productos
                                    </h2>
                                </button>
                            </div>
                                <div style={width > limite? {width:'300px', height:'50px', display:'flex', alignItems:'center', position:'absolute', right:'0', justifyContent:'center'}:{width:'100%', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <button type="submit" onClick={() => realizarVenta()} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'40px', width:'260px', display:'flex', alignItems:'center', justifyContent:'center'}}>     
                                        <h2 id="text_lista" style={{color:'white', fontWeight:'bold'}}>
                                         Realizar Venta
                                        </h2>
                                    </button>
                                </div>
                            </div>
                        </div>

                </div>

            </div>
        </>
    );
}
