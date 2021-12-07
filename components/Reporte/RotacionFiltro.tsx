import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Pie } from 'react-chartjs-2';
import { stringToDateToString, mayusculaPrimeraLetra } from '../../helpers/helper';
import { getVentasBottom, getVentasReportes, getVentasTop, getEntradasReportesFiltro } from '../../api/producto';
import { getUsers } from '../../api/user';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
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

const RotacionFiltro = ({ width, height, scrollPosition, limite, filtroValor }: any) => {

  const [reportes, setReportes] = useState({ grafico: [], tabla: [], graficoEntradas: [], tablaEntradas: [], top: [], bottom: [], usuarios: [] });

  const { grafico, tabla, graficoEntradas, tablaEntradas, top, bottom, usuarios }: any = reportes;
  const [filtro] = useState(filtroValor);
  const fetchProducts = async () => {
    const data = await getVentasReportes(filtro);
    const dataEntradas = await getEntradasReportesFiltro(filtro);
    const dataTop = await getVentasTop(3);
    const dataBottom = await getVentasBottom(3);
    const dataUsers = await getUsers();
    setReportes({ grafico: data.grafico, tabla: data.tabla, graficoEntradas: dataEntradas.grafico, tablaEntradas: dataEntradas.tabla, top: dataTop.top, bottom: dataBottom.bottom, usuarios: dataUsers.usuarios });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const dataVentasEntradas = {
    labels: usuarios?.map((reporte: any) => reporte.name),
    datasets: [
      {
        label: "Ventas",
        data: grafico?.map((reporte: any) => reporte.cantidad),
        backgroundColor: "rgba(213, 97, 24, 0.5)",
      },
      {
        label: "Entradas",
        data: graficoEntradas?.map((reporte: any) => reporte.cantidad),
        backgroundColor: "rgba(0, 48, 87, 0.5)",
      },
    ],
  };

  const dataTop = {
    labels: top?.map((reporte: any) => reporte.nombre),
    datasets: [
      {
        label: 'Cantidad',
        data: top?.map((reporte: any) => reporte.total),
        backgroundColor: "rgba(213, 97, 24, 0.5)",
      },
    ],
  };

  const dataBottom = {
    labels: bottom?.map((reporte: any) => reporte.nombre),
    datasets: [
      {
        label: 'Cantidad',
        data: bottom?.map((reporte: any) => reporte.total),
        backgroundColor: "rgba(213, 97, 24, 0.5)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Ventas " + mayusculaPrimeraLetra(filtro),
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

  const optionsTop = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Productos más vendidos " + mayusculaPrimeraLetra(filtro),
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

  const optionsBottom = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Productos menos vendidos " + mayusculaPrimeraLetra(filtro),
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
        <Bar width={200} height={400} options={options} data={dataVentasEntradas} />
      </div>
      <div style={{ marginLeft: '15px', marginRight: '15px', height: '400px', width: '1000px', margin: 'auto' }}>
        <Bar width={100} height={200} options={optionsTop} data={dataTop} />
      </div>
      <div style={{ marginLeft: '15px', marginRight: '15px', height: '400px', width: '1000px', margin: 'auto' }}>
        <Bar width={100} height={200} options={optionsBottom} data={dataBottom} />
      </div>
    </>
  )
}

export default RotacionFiltro