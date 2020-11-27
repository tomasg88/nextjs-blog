import '../styles/global.css'
/*
    . Este archivo es comun a todas las pages
    . Es posible guardar el estado en este componente para cuando se navega entre páginas
    . Acá es el único lugar donde se pueden importar modulos CSS GLOBALES

*/
export default function App ({ Component, pageProps }) {
    return <Component {...pageProps} />
}