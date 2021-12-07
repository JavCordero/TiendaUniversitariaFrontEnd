import React, { useState, useEffect } from 'react';
import RotacionFiltro from './RotacionFiltro';

const Rotacion = ({ width, height, scrollPosition, limite }: any) => {

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
                                <option value="0">Semestral</option>
                                <option value="1">Anual</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid" id="contenedor" style={{ width: width, height: height - 100, marginLeft: '0' }}>
                <div className="col" style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '50px', height: '20px' }}></div>
                {filtro === "0" &&
                    <RotacionFiltro width={width} height={height} scrollPosition={scrollPosition} limite={limite} filtroValor={"semestral"} />
                }
                {filtro === "1" &&
                    <RotacionFiltro width={width} height={height} scrollPosition={scrollPosition} limite={limite} filtroValor={"anual"} />
                }
            </div>
        </>
    )
}

export default Rotacion