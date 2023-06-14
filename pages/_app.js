import ReduxProvider from '../redux/ReduxProvider'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return <>
    <ReduxProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ReduxProvider>
  </>
}

export default MyApp
