import React, {useState, useEffect} from "react";
import { getProductos, getProductosEspecifico } from "../api/producto";
import { BsSearch } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {  TextField, IconButton } from '@material-ui/core';
import { IconType } from "react-icons";
import router, { useRouter } from 'next/router';
import Swal from 'sweetalert2';
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

export const FormListaProductos = () => {

    const Router = useRouter();

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

    const molde = [{nombre:"", codigo_interno:"", codigo_barra:"", precio:"", cantidad:"", stock_critico:""}];

    const [algo, setAlgo] = useState(molde);

    const fetchProducts = async () => {
        const data = await getProductos();
        const resp: any[] = Array.of(data.json);
        //console.log(data.productos[1].nombre)
        
        var newProduct = [{nombre:"", codigo_interno:"", codigo_barra:"", precio:"", cantidad:"", stock_critico:""}];
        for (var i = 0; i < data.productos.length; i++){
            newProduct.push({nombre: data.productos[i].nombre, 
                        codigo_interno: data.productos[i].codigo_interno, 
                        codigo_barra: data.productos[i].codigo_barra, 
                        precio: data.productos[i].precio, 
                        cantidad: data.productos[i].cantidad, 
                        stock_critico: data.productos[i].stock_critico});
        }
        //console.log(newProduct);
        setAlgo(newProduct);
        setMainRecipesShown(newProduct);
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const [query, setQuery] = useState("");

    const items = [];

    const [mainProductShown, setMainRecipesShown] = useState([{nombre:"", codigo_interno:"", codigo_barra:"", precio:"", cantidad:"", stock_critico:""}]);

    let mainProductRegrex = new RegExp(query, "i")

    useEffect(() => {
        filterProducts2()
    }, [query])

    const filterProducts2 = () => {
        var newProduct = [{nombre:"", codigo_interno:"", codigo_barra:"", precio:"", cantidad:"", stock_critico:""}];
        if(query.length > 0) {
            

            for(var i = 0; i < algo.length; i++) {
                if (mainProductRegrex.test(algo[i].nombre) || mainProductRegrex.test(algo[i].codigo_interno)){
                    newProduct.push(algo[i]);
                }
            }
            setMainRecipesShown(newProduct)
        } else if (query.length === 0) {
            setMainRecipesShown(algo)
        }
    }

    const handleAccederVenta = () => {
        Router.push("/Tienda/RealizarVenta");
    }

    //const productoModificar = {nombre:"", codigo_interno:"", codigo_barra:"", precio:"", cantidad:"", stock_critico:""};
    //const id = "";
    async function handleModificar(i: number){
        const productoModificar = mainProductShown[i];
        var id = productoModificar.codigo_interno;
        
        const producto = await getProductosEspecifico(id);
        
        Router.push(`/Tienda/ModificarProductos/${producto.producto.codigo_interno}`);
        
        //console.log(productoModificar.nombre);
    }

    var productoVenta = {nombre:"", codigo_interno:"", codigo_barra:"", precio:"", cantidad:"", stock_critico:""};
    function handleVenta(i: number){
        productoVenta = mainProductShown[i];

        if(parseInt(productoVenta.cantidad)>0){
            const infoProducto = {
                codigo_interno: productoVenta.codigo_interno,
                nombre: productoVenta.nombre,
                cantidad: 1, 
                cantidad_actual: productoVenta.cantidad, 
                stock_critico: productoVenta.stock_critico
            };

            if(sessionStorage.getItem(`Producto ${productoVenta.codigo_interno}`) === null){
                sessionStorage.setItem(`Producto ${productoVenta.codigo_interno}`, JSON.stringify(infoProducto));  
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El producto se agregó a la venta.'
                });
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Producto encontrado',
                    text: 'El producto ya esta agregado en el carro.'
                });
            }

        }

        else{
            Swal.fire({
                icon: 'error',
                title: 'Producto sin stock',
                text: 'El producto tiene stock 0.'
            });
        }

        console.log(productoVenta);
    }

    

    for (var i = 1; i < mainProductShown.length; i++){
        items.push(
        <div className="container-fluid" key={i} id="contenedor_lista" style={{height:'100px', width:'1440px'}}>
            <div className="row" id="fila_lista" style={i === (mainProductShown.length - 1)? {borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px', borderBottom:'2px solid #425563'}: {}}>
                <div style={{width:'178px'}}>
                    <h2 id="text_lista" style={{width:'180px', height:'100px', paddingLeft:'20px', display:'flex', alignItems:'center'}}>
                        {mainProductShown[i]["nombre"]}
                    </h2>
                </div>
                <div id="elementos_lista" style={{width:'180px'}}>
                    <h2 id="text_lista">
                        {mainProductShown[i]["codigo_interno"]}
                    </h2>
                </div>
                <div id="elementos_lista" style={{width:'180px'}}>
                    <h2 id="text_lista">
                        {mainProductShown[i]["codigo_barra"]}
                    </h2>
                </div>
                <div id="elementos_lista" style={{width:'180px'}}>
                    <h2 id="text_lista">
                        {mainProductShown[i]["precio"]}
                    </h2>
                </div>
                <div id="elementos_lista" style={{width:'180px'}}>
                    <h2 id="text_lista">
                        {mainProductShown[i]["cantidad"]}
                    </h2>
                </div>
                <div id="elementos_lista" style={{width:'180px'}}>
                    {mainProductShown[i]["cantidad"] <= mainProductShown[i]["stock_critico"] &&
                        <h2 id="text_lista" style={{color:'#59081e', fontWeight:'bold'}}>
                            Crítico
                        </h2>
                    }
                    {((mainProductShown[i]["cantidad"] > mainProductShown[i]["stock_critico"]) && (mainProductShown[i]["cantidad"] <= (mainProductShown[i]["stock_critico"] + 5))) &&
                        <h2 id="text_lista" style={{color:'#aa6d33', fontWeight:'bold'}}>
                            Casi crítico
                        </h2>
                    }
                    {mainProductShown[i]["cantidad"] > (mainProductShown[i]["stock_critico"] + 5) &&
                        <h2 id="text_lista" style={{color:'#005747', fontWeight:'bold'}}>
                            No crítico
                        </h2>
                    }
                </div>
                <div id="elementos_lista" style={{width:'180px'}}>
                    <button type="submit" value={i}  onClick={(e) => {handleModificar(parseInt((e.target as HTMLButtonElement).value));}} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'40px', width:'130px', display:'flex', alignItems:'center', justifyContent:'center'}}>                      
                        <FaEdit style={{pointerEvents:'none'}}/>       
                    </button>
                </div>
                <div id="elementos_lista" style={{width:'178px'}}>
                    <button type="submit" value={i} onClick={(e) => {handleVenta(parseInt((e.target as HTMLButtonElement).value));}} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'40px', width:'130px', display:'flex', alignItems:'center', justifyContent:'center'}}>     
                        <AiOutlineShoppingCart style={{pointerEvents:'none'}}/>
                    </button>
                </div>
            </div>
        </div>)
    }

    const { width, height } = useWindowDimensions()
    const limite = 900;

    /* const filterProducts = async () => {
        const {productos} = await getProductos();
        setNum(2);
        if(query.length > 0) {
            let newProduct = [...productos].filter(product => mainProductRegrex.test(product.nombre) || mainProductRegrex.test(product.codigo_interno))
            setMainRecipesShown(newProduct)
        } else if (query.length === 0) {
            setMainRecipesShown([...productos])
        }
    } */

    return(
        <>
            <div className="container-fluid" id="contenedor" style={{width:width, height: height - 100, marginLeft:'0'}}>
                <div className="col" style={{paddingLeft:'0', paddingRight:'0', paddingTop:'50px'}}>
                    <div className="container-fluid" id="contenedor_lista" style={{height: width > limite? '50px': '100px', width:'100%', maxWidth:'1470px', marginLeft:'0', marginRight:'0'}}>
                        <div className={width > limite? "row":"col"} style={{height: width > limite? '50px': '100px', width:((width * 0.7)), position:'relative', marginLeft: (width*0.15) + scrollPosition - (55/2), marginRight: (width*0.15) + 55}}>
                            <div style={width > limite? {width:'300px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}:{width:'100%', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                {width > limite &&
                                    <TextField
                                        className="form-control"
                                        variant="standard"
                                        placeholder=" Buscar nombre o código interno..."
                                        InputProps={{
                                            startAdornment: (
                                                <BsSearch/>
                                            ),
                                        }} 
                                        key="random1" 
                                        value={query} 
                                        onChange={(e) => setQuery(e.target.value)}
                                    /> 
                                }
                                {width <= limite &&
                                    <button type="submit" onClick={handleAccederVenta} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'30px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>                      
                                        <h2 id="text_lista" style={{color:'white', fontWeight:'bold'}}>
                                            Acceder a venta
                                        </h2>
                                    </button>
                                }
                            </div>
                            <div style={width > limite? {width:'300px', height:'50px', display:'flex', alignItems:'center', position:'absolute', right:'0', justifyContent:'center'}:{width:'100%', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                {width > limite &&
                                    <button type="submit" onClick={handleAccederVenta} className="btn btn-primary btn-block btn-lg" id="boton_lista" style={{height:'30px', width:'250px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <h2 id="text_lista" style={{color:'white', fontWeight:'bold'}}>
                                            Acceder a venta
                                        </h2>
                                    </button>
                                }
                                {width <= limite &&
                                    <TextField
                                        className="form-control"
                                        variant="standard"
                                        placeholder=" Buscar nombre o código interno..."
                                        InputProps={{
                                            startAdornment: (
                                                <BsSearch/>
                                            ),
                                        }} 
                                        style={{marginTop:'30px'}}
                                        key="random1" 
                                        value={query} 
                                        onChange={(e) => setQuery(e.target.value)}
                                    /> 
                                }
                            </div>
                            


                            {/* <i className="fa fa-search"></i>
                            <input className="form-control rounded-pill" key="random1" maxLength={60} value={query} onChange={(e) => setQuery(e.target.value)}/> */}
                             
                        </div>
                    </div>
                    <div className="container-fluid" id="contenedor_lista" style={{height:'50px', marginTop:'50px', width:'1470px'}}>
                        <div className="row" style={{width:'1440px', height:'50px', display:'flex', marginLeft:'15px', marginRight:'15px', backgroundColor:'#425563', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}>
                            <div id="header_lista" style={{width:'180px', height:'50px'}}>
                                <h2 id="text_lista">
                                    Nombre
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Código Interno
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Código de Barras
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Precio
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Stock Actual
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Estado
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Modificar Stock
                                </h2>
                            </div>
                            <div id="header_lista" style={{width:'180px'}}>
                                
                                <h2 id="text_lista">
                                Vender
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:'15px', marginRight:'15px'}}>{items}</div>
                    {/* {mainProductShown.length === 1 &&
                        <div style={{marginLeft:'15px', marginRight:'15px'}}>
                            <div className="container-fluid" id="contenedor_lista" style={{height:'50px', width:'1440px'}}>
                                <div id="fila_lista" style={{height:'100%', borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px', borderBottom:'2px solid #425563', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                </div>
                            </div>
                        </div>
                       
                    } */}
                    {mainProductShown.length === 1 &&
                         <div className="container-fluid" id="contenedor_lista" style={{height:'100px', width:'100%', maxWidth:'1470px', marginLeft:'0', marginRight:'0'}}>
                            <div style={{height:'100px', width:((width * 0.7)), position:'relative', marginLeft: (width*0.15) + scrollPosition - (55/2), marginRight: (width*0.15) + 55, display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <h2 id="text_lista">
                                    No se encuentra el producto buscado
                                </h2>
                            </div>
                         </div>
                    }
                    
                    <div style={{height:'50px'}}>

                    </div>
                </div>
            </div>
        </>
    )
}