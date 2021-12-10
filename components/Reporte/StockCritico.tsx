import React, { useState, useEffect } from 'react';
import { getProductos } from '../../api/producto';
import { stringToDateToString } from '../../helpers/helper';

const StockCritico = ({ width, height, scrollPosition, limite }: any) => {

    const molde = [{ fecha: "", nombre: "", cantidad: "" }];
    const [algo, setAlgo] = useState(molde);
    const fetchProducts = async () => {
        const data = await getProductos();
        const resp: any[] = Array.of(data.json);
        var newProduct = [{ fecha: "", nombre: "", cantidad: "" }];
        for (var i = 0; i < data.productos.length; i++) {
            if (data.productos[i].cantidad <= data.productos[i].stock_critico) {
                newProduct.push({
                    fecha: stringToDateToString(data.productos[i].fecha_notificacion),
                    nombre: data.productos[i].nombre,
                    cantidad: data.productos[i].cantidad
                });
            };
        }
        setAlgo(newProduct);
        setMainRecipesShown(newProduct);
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const items = [];
    const [mainProductShown, setMainRecipesShown] = useState([{ fecha: "", nombre: "", cantidad: "" }]);

    for (var i = 1; i < mainProductShown.length; i++) {
        items.push(
            <div className="container-fluid" key={i} id="contenedor_lista" style={{ height: '100px', width: '540px' }}>
                <div className="row" id="fila_lista" style={i === (mainProductShown.length - 1) ? { borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', borderBottom: '2px solid #425563' } : {}}>
                    <div style={{ width: '178px' }}>
                        <h2 id="text_lista" style={{ width: '180px', height: '100px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                            {mainProductShown[i]["fecha"]}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {mainProductShown[i]["nombre"]}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '178px' }}>
                        <h2 id="text_lista">
                            {mainProductShown[i]["cantidad"]}
                        </h2>
                    </div>
                </div>
            </div>)
    }

    return (
        <>
        <div className="container-fluid" id="contenedor" style={{width:width, height: height - 100, marginLeft:'0'}}>
            <div className="container-fluid" id="contenedor_lista" style={{ height: '50px', marginTop: '50px', width: '570px', paddingLeft: '15px' }}>
                <div className="row" style={{ width: '540px', height: '50px', display: 'flex', marginLeft: '0px', marginRight: '0px', backgroundColor: '#425563', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                    <div id="header_lista" style={{ width: '180px', height: '50px' }}>
                        <h2 id="text_lista">
                            Fecha
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Producto
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Cantidad
                        </h2>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '15px', marginRight: '15px' }}>{items}</div>
            {mainProductShown.length === 1 &&
                <div style={{marginLeft:'15px', marginRight:'15px'}}>
                    <div className="container-fluid" key={i} id="contenedor_lista" style={{height:'100px', width:'540px'}}>
                        <div className="row" id="fila_lista" style={{borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px', borderBottom:'2px solid #425563'}}>

                        </div>
                    </div>
                </div>
            }
            {mainProductShown.length === 1 &&                    
                <div className="container-fluid" id="contenedor_lista" style={{height:'100px', width:'100%', maxWidth:'570px', marginLeft:'0', marginRight:'0'}}>
                    <div style={{height:'100px', width:((width * 0.7)), position:'relative', marginLeft: (width*0.15) + scrollPosition - (55/2), marginRight: (width*0.15) + 55, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <h2 id="text_lista" style={{marginBottom: '200px'}}>
                            No se encuentran resultados
                        </h2>
                    </div>
                </div>
            }
            <div style={{ height: '50px' }}></div>
        </div>
        </>
    )
}

export default StockCritico