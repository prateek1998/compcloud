import Header from '@components/layout/Header';
import FileUploader from '@components/layout/FileUploaderMultiple';
import Footer from '@components/layout/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-100 px-4 lg:px-40 pt-5">
      <Header />
      <FileUploader />
      <Footer />
    </div>
  );
};

export default Home;
