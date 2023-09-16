import { readdir, stat, existsSync, unlinkSync } from 'fs';
import { CronJob } from 'cron';
import path from 'path';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import FileUploader from 'components/layout/FileUploaderMultiple';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-100 px-4 lg:px-40 pt-5">
      <Header />
      <FileUploader />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  let timePeriod = 60 * 60; //1 hour
  // let timePeriod = 10; //10 sec

  var dbBackupCron = new CronJob({
    cronTime: '00 00 01 * * *',
    // cronTime: "*/30 * * * * *",
    onTick: function () {
      console.log('Inside Cron job method Called');
      var uploadsDir = path.join('uploads');
      readdir(uploadsDir, function (err, files) {
        files.forEach(function (file, index) {
          stat(path.join(uploadsDir, file), function (err, stat) {
            var endTime, now;
            if (err) {
              return console.error(err);
            }
            now = new Date().getTime();
            endTime = new Date(stat.ctime).getTime() + timePeriod;
            if (now > endTime) {
              let deletedFile = path.join(uploadsDir, file);
              if (existsSync(deletedFile)) {
                unlinkSync(deletedFile);
                console.log('successfully deleted', deletedFile);
              }
            }
          });
        });
      });
    },
    start: false,
    timeZone: 'Asia/Kolkata',
  });

  dbBackupCron.start();
  return {
    props: {
      // info: 'info'
    },
  };
}

export default Home;
