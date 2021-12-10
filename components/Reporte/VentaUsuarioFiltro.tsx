import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import { stringToDateToString, mayusculaPrimeraLetra } from '../../helpers/helper';
import { getVentasReportes } from '../../api/producto';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.set('plugins.datalabels', {
    anchor: 'end',
    align: 'top',
    offset: -2
});

ChartJS.defaults.set('plugins.legend', {
    position: 'right' as const,
    fontSize: 12
});

const VentaUsuarioFiltro = ({ width, height, scrollPosition, limite, filtroValor }: any) => {

    const [reportes, setReportes] = useState({ grafico: [], tabla: [] });
    const { grafico, tabla }: any = reportes;
    const [filtro] = useState(filtroValor);
    const fetchProducts = async () => {
        const data = await getVentasReportes(filtro);
        console.log(data)
        setReportes(data != null ? { grafico: data.grafico, tabla: data.tabla } : { grafico: null, tabla: null });
        console.log(reportes);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const items = [];

    for (var i = 0; i < tabla.length; i++) {
        items.push(
            <div className="container-fluid" key={i} id="contenedor_lista" style={{ height: '100px', width: '1080px' }}>
                <div className="row" id="fila_lista" style={i === (tabla.length - 1) ? { borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', borderBottom: '2px solid #425563' } : {}}>
                    <div style={{ width: '178px' }}>
                        <h2 id="text_lista" style={{ width: '180px', height: '100px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                            {stringToDateToString(tabla[i]?.fecha)}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {tabla[i]?.cantidad}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {tabla[i]?.nombre_producto}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {tabla[i]?.codigo_interno}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            {tabla[i]?.precio}
                        </h2>
                    </div>
                    <div id="elementos_lista" style={{ width: '178px' }}>
                        <h2 id="text_lista">
                            {tabla[i]?.nombre_usuario}
                        </h2>
                    </div>
                </div>
            </div>)
    }

    const labels = grafico?.map((reporte: any) => reporte.nombre);
    const data = {
        labels,
        datasets: [
            {
                label: "Cantidad",
                data: grafico?.map((reporte: any) => reporte.cantidad),
                backgroundColor: "rgba(213, 97, 24, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Ventas usuarios " + mayusculaPrimeraLetra(filtro),
                font: {
                    size: 20,
                },
                padding: {
                    top: 5,
                    bottom: 30,
                },
            },
        },
    };

    return (
        <>
            <div style={{ marginLeft: '15px', marginRight: '15px', height: '400px', width: '1000px', margin: 'auto' }}>
                <Bar width={200} height={400} options={options} data={data} />
            </div>
            <div className="container-fluid" id="contenedor_lista" style={{ height: '50px', marginTop: '50px', width: '1110px', paddingLeft: '15px' }}>
                <div className="row" style={{ width: '1080px', height: '50px', display: 'flex', marginLeft: '0px', marginRight: '0px', backgroundColor: '#425563', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
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
                            Código producto
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Valor
                        </h2>
                    </div>
                    <div id="header_lista" style={{ width: '180px' }}>
                        <h2 id="text_lista">
                            Usuario
                        </h2>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '15px', marginRight: '15px' }}>{items}</div>
            {tabla.length === 0 &&
                <div style={{marginLeft:'15px', marginRight:'15px'}}>
                    <div className="container-fluid" key={i} id="contenedor_lista" style={{height:'100px', width:'1080px'}}>
                        <div className="row" id="fila_lista" style={{borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px', borderBottom:'2px solid #425563'}}>

                        </div>
                    </div>
                </div>
            }
            {tabla.length === 0 &&                    
                <div className="container-fluid" id="contenedor_lista" style={{height:'100px', width:'100%', maxWidth:'1110px', marginLeft:'0', marginRight:'0'}}>
                    <div style={{height:'100px', width:((width * 0.7)), position:'relative', marginLeft: (width*0.15) + scrollPosition - (55/2), marginRight: (width*0.15) + 55, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <h2 id="text_lista" style={{marginBottom: '200px'}}>
                                    No se encuentran resultados
                        </h2>
                    </div>
                </div>
            }
            <div style={{ height: '50px' }}></div>
        </>

    )
}

export default VentaUsuarioFiltro