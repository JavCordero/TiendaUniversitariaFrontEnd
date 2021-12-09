import React, { useState, useEffect } from 'react';
import { stringToDateToString } from '../../helpers/helper';
import { getEntradas } from '../../api/producto';
import { getProducto } from '../../api/producto';

const IngresoProducto = ({ width, height, scrollPosition, limite }: any) => {

    const molde = [{ fecha: "", cantidad: "", nombre: "", valor: "" }];
    const [algo, setAlgo] = useState(molde);

    const fetchProducts = async () => {
        const data = await getEntradas();
        const resp: any[] = Array.of(data.json);
        var newProduct = [{ fecha: "", cantidad: "", nombre: "", valor: "" }];
        for (var i = 0; i < data.entradas.length; i++) {
            const { producto } = await getProducto(data.entradas[i].producto_codigo_interno);
            newProduct.push({
                fecha: stringToDateToString(data.entradas[i].fecha),
                cantidad: data.entradas[i].cantidad,
                nombre: producto.nombre,
                valor: producto.precio
            });
        }

        setAlgo(newProduct);
        setMainRecipesShown(newProduct);
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const items = [];
    const [mainProductShown, setMainRecipesShown] = useState([{ fecha: "", cantidad: "", nombre: "", valor: "" }]);

    for (var i = 1; i < mainProductShown.length; i++) {
        items.push(
            <div className="container-fluid" key={i} id="contenedor_lista" style={{ height: '100px', width: '720px' }}>
                <div className="row" id="fila_lista" style={i === (mainProductShown.length - 1) ? { borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', borderBottom: '2px solid #425563' } : {}}>
                    <div style={{ width: '178px' }}>
                        <h2 id="text_lista" style={{ width: '180px', height: '100px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                            {mainProductShown[i]["fecha"]}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {mainProductShown[i]["cantidad"]}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {mainProductShown[i]["nombre"]}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '178px' }}>
                        <h2 id="text_lista">
                            {mainProductShown[i]["valor"]}
                        </h2>
                    </div>
                </div>
            </div>)
    }

    return (
        <>
            <div className="container-fluid" id="contenedor_lista" style={{ height: '50px', marginTop: '50px', width: '750px', paddingLeft: '15px' }}>
                <div className="row" style={{ width: '720px', height: '50px', display: 'flex', marginLeft: '0px', marginRight: '0px', backgroundColor: '#425563', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                    <div id="header_lista" style={{ width: '180px', height: '50px' }}>
                        <h2 id="text_lista">
                            Fecha
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Cantidad
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Producto
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Valor
                        </h2>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '15px', marginRight: '15px' }}>{items}</div>
            <div style={{ height: '50px' }}></div>
        </>
    )
}

export default IngresoProducto