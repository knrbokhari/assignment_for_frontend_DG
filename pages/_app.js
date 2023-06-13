import ReduxProvider from '../redux/ReduxProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  </>
}

export default MyApp
