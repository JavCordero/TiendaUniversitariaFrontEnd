import React, { useState, useEffect } from 'react';
import VentaUsuarioFiltro from './VentaUsuarioFiltro';

const VentaUsuario = ({ width, height, scrollPosition, limite }: any) => {

    const [filtro, setFiltro] = useState("0");
    const handleSelect = (valor: any) => {
        setFiltro(valor);
    };

    return (
        <>
            <div className="container-fluid" id="contenedor" style={{ width: width, height: 100, marginLeft: '0' }}>
                <div className="col" style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '50px', height: '20px' }}></div>
                <div className="container-fluid" id="contenedor_lista" style={{ height: width > limite ? '50px' : '100px', width: '100%', maxWidth: '1470px', marginLeft: '0', marginRight: '0' }}>
                    <div style={{ height: '50px', width: ((width * 0.7)), position: 'relative', marginLeft: (width * 0.15) + scrollPosition - (55 / 2), marginRight: (width * 0.15) + 55, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <div style={width > limite ? { width: '300px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' } : { width: '300px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <select defaultValue={'0'} onChange={(e) => { handleSelect(e.target.value) }} name="categoria" className="form-control">
                                <option value="0">Diario</option>
                                <option value="1">Semanal</option>
                                <option value="2">Mensual</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid" id="contenedor" style={{ width: width, height: height - 100, marginLeft: '0' }}>
                <div className="col" style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '50px', height: '20px' }}></div>
                {filtro === "0" &&
                    <VentaUsuarioFiltro width={width} height={height} scrollPosition={scrollPosition} limite={limite} filtroValor={"diario"} />
                }
                {filtro === "1" &&
                    <VentaUsuarioFiltro width={width} height={height} scrollPosition={scrollPosition} limite={limite} filtroValor={"semanal"} />
                }
                {filtro === "2" &&
                    <VentaUsuarioFiltro width={width} height={height} scrollPosition={scrollPosition} limite={limite} filtroValor={"mensual"} />
                }
            </div>
        </>

    )
}

export default VentaUsuario