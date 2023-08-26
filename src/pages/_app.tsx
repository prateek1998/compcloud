import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';

interface Props {
  children: React.ReactNode;
}

const Nope: React.FC<Props> = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || Nope;

  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} key={router.route} />
        <ToastContainer newestOnTop />
      </Layout>
    </>
  );
}
