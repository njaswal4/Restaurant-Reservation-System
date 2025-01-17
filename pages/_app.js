import '../styles/bootstrap.min.css';
import "../styles/global.css";
import Layout from '../component/Layout';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <SWRConfig value={{
        fetcher: async url => {
          const res = await fetch(url)

          if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.')
            // Attach extra info to the error object.
            error.info = await res.json()
            error.status = res.status
            throw error
          }
          return res.json()
        }
      }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  )
}

