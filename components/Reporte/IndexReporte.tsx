import React, { useState, useEffect } from 'react';
import VentaUsuario from './VentaUsuario';
import Inventario from './Inventario';
import IngresoProducto from './IngresoProducto'
import Rotacion from './Rotacion'
import StockCritico from './StockCritico'

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

const IndexReporte = () => {

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

    const { width, height } = useWindowDimensions();
    const limite = 900;
    const [select, setSelect] = useState("");

    function handleSelect(value: string) {
        setSelect(value);
    }

    return (
        <>
            <div className="container-fluid" id="contenedor" style={{ width: width, height: 100, marginLeft: '0' }}>
                <div className="col" style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '50px', height: '20px' }}></div>
                <div className="container-fluid" id="contenedor_lista" style={{ height: width > limite ? '50px' : '100px', width: '100%', maxWidth: '1470px', marginLeft: '0', marginRight: '0' }}>
                    <div style={{ height: '50px', width: ((width * 0.7)), position: 'relative', marginLeft: (width * 0.15) + scrollPosition - (55 / 2), marginRight: (width * 0.15) + 55, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={width > limite ? { width: '300px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' } : { width: '300px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <select defaultValue={'0'} onChange={(e) => { handleSelect(e.target.value) }} name="categoria" className="form-control">
                                <option value="0">Seleccione un reporte</option>
                                <option value="1">Venta usuarios</option>
                                <option value="2">Inventario</option>
                                <option value="3">Ingreso producto</option>
                                <option value="4">Rotación productos</option>
                                <option value="5">Stock crítico</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {select === "1" &&
                <VentaUsuario width={width} height={height} scrollPosition={scrollPosition} limite={limite} />
            }
            {select === "2" &&
                <Inventario width={width} height={height} scrollPosition={scrollPosition} limite={limite} />
            }
            {select === "3" &&
                <IngresoProducto width={width} height={height} scrollPosition={scrollPosition} limite={limite} />
            }
            {select === "4" &&
                <Rotacion width={width} height={height} scrollPosition={scrollPosition} limite={limite} />
            }
            {select === "5" &&
                <StockCritico width={width} height={height} scrollPosition={scrollPosition} limite={limite} />
            }
        </>
    )
}

export default IndexReporte