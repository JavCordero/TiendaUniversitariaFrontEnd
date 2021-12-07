import type { AppProps } from 'next/app'
import AuthProvider from '../contexts/AuthContext';

import "../styles/tiendaUniversitariaEstilos.css";
import "../styles/sideBarMenu.scss";
import "../styles/SideBarMenuItemView.scss";
import "../styles/login/login.scss";
import "bootstrap-css-only/css/bootstrap.min.css";
import '../styles/globals.scss';
import '../styles/listaProductos.css';
import { Header } from "../components/layout/Header";

import { Loading } from "../components/Loading";


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>

      <Component {...pageProps} />

    </AuthProvider>
  );
}
export default MyApp
