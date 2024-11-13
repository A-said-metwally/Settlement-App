import Head from '../utils/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  return (
      <div id='app'>
        <Head title="Settlement App"/>
        <Component {...pageProps}   />
      </div>
  )
  
}


export default MyApp
