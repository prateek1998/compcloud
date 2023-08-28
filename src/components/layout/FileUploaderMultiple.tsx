import React, { useEffect, Fragment, useState, SyntheticEvent, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload, AiOutlineDownload, AiOutlineLink } from 'react-icons/ai';
import notifyToaster from '@components/react-toast';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';

interface FileProp {
  name: string;
  type: string;
  size: number;
  filePath: string;
  newSize: number;
  fileUrl: string;
  fileLocation: string;
}

const fileOptions = [
  {
    label: 'Webp',
    value: 'webp',
  },
  {
    label: 'Png',
    value: 'png',
  },
  {
    label: 'Jpg',
    value: 'jpg',
  },
];

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<FileProp[]>([]);
  const [type, setType] = useState<string>('webp');
  const [quality, setQuality] = useState<string>('10');

  const onDropAccepted = useCallback(async (acceptedFiles: any) => {
    let tmpFiles = [];
    let id = notifyToaster('loading', 'Please wait...');
    for (let index = 0; index < acceptedFiles.length; index++) {
      const file = acceptedFiles[index];
      const formData = new FormData();
      formData.append('images', file);
      formData.append('fileExt', type);
      formData.append('fileQuality', quality);
      let { data }: any = await axios
        .post('/api/upload', formData)
        .catch((err) => console.log('err', err));
      if (data.success) {
        file['newSize'] = data.data.finalSize;
        file['filePath'] = data.data.filePath;
        file['fileUrl'] = 'api/download/' + data.data.filePath.split('\\')[1];
      }
      tmpFiles.push(file);
    }
    notifyToaster('update', 'Files converted successfully', id);
    setFiles(tmpFiles);
  }, [type, quality]);

  const onDropRejected = useCallback(async (rejectedFiles: any) => {
    let file = rejectedFiles[0];
    notifyToaster('Error', file.errors[0].message);
  }, []);

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: {
      'text/image': ['.jpeg', '.jpg', '.png', '.gif', '.svg'],
    },
  });

  const renderFilePreview = (file: any) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          width={90}
          alt={file.name}
          className="rounded-xl border-solid border-white-300 border-2 "
          src={URL.createObjectURL(file)}
        />
      );
    } else {
      return (
        <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
          <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" />
        </svg>
      );
    }
  };

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: FileProp) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const handleLinkUpdate = (filePath: string, fileLocation: string) => {
    const filtered = files.map((i: FileProp) => {
      if (i.filePath === filePath)
        i['fileLocation'] = fileLocation;
      return i
    })
    setFiles(filtered);
  }

  const handleCloudUpload = async (file: any) => {
    let payload = {
      filePath: file.filePath
    }
    let id = notifyToaster('loading', 'Please wait file uploading...');
    let { data }: any = await axios
      .post('/api/upload/cloud', payload)
      .catch((err) => console.log('err', err));
    if (data.success) {
      handleLinkUpdate(data.data.path, data.data.location);
      notifyToaster('update', 'Files Uploaded successfully', id);
    }
  }

  const calculateSize = (size: number) =>
    Math.round(size / 100) / 10 > 1000
      ? `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
      : `${(Math.round(size / 100) / 10).toFixed(1)} kb`;

  const calculateCompress = (oldSize: number, newSize: number) =>
    (((oldSize - newSize) / oldSize) * 100).toFixed(2);

  const fileList = files.map((file: FileProp) => (
    <li key={file.name} className="border-2 border-gray-200 rounded-lg list-none p-3 ">
      <div className="flex items-center">
        <div className="flex mr-3 h-[70px]">{renderFilePreview(file)}</div>
        <div>
          <h2 className="font-medium text-gray-600">File Name: {file.name}</h2>
          <h2 className="text-gray-500 text-md">Original Size: {calculateSize(file.size)}</h2>
          <h2 className="text-gray-500 text-md">New Size: {calculateSize(file.newSize)}</h2>
          <h2 className="text-gray-500 text-md">
            Compress:{' '}
            <span className="font-bold ">{calculateCompress(file.size, file.newSize)}% </span>
          </h2>
        </div>
        <div className="rounded-full flex flex-grow justify-end  ">
          <div className="flex flex-col justify-items-center text-center">
            <Tooltip message={'Download!'}>
              <Button
                classNames="flex justify-center"
                onClick={() => (window.location.href = file.fileUrl)}
              >
                <AiOutlineDownload size="1.25rem" />
              </Button>
            </Tooltip>
            {
              !file.fileLocation?.length ?
                <Tooltip message={'Upload to S3 Bucket!'}>
                  <Button classNames="bg-blue-700 border-blue-600 hover:border-blue-500 mt-3"
                    onClick={() => handleCloudUpload(file)}
                  >
                    <AiOutlineCloudUpload size="1.25rem" />
                  </Button>
                </Tooltip>
                :
                <Tooltip message={'Copy Link'}>
                  <Button classNames="bg-blue-700 border-blue-600 hover:border-blue-500 mt-3"
                    onClick={() => {
                      notifyToaster('Info', 'Link Copied ');
                      navigator.clipboard.writeText(file.fileLocation)
                    }}
                  >
                    <AiOutlineLink size="1.25rem" />
                  </Button>
                </Tooltip>
            }
          </div>
        </div>
        {/* <div onClick={() => handleRemoveFile(file)} className='rounded-full flex flex-grow justify-end  '>
          <div className='hover:bg-gray-100 hover:cursor-pointer p-2 texst-gray-400 rounded-full text-2xl'>
            <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                clipRule="evenodd"
              />
            </svg>
          </div> 
        {/* </div> */}
      </div>
    </li>
  ));

  const handleLinkClick = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  const handleDownloadAll = () => {
    files.map(file => {
      window.open(file.fileUrl)
      // window.location.href = file.fileUrl
    })
  }

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <main className="mb-auto mt-2 px-6 py-4 bg-white rounded overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row pb-4 justify-between ">
        <div>
          <div className="font-medium text-xl text-gray-700 mb-2">Upload Multiple Files</div>
          <p className="text-gray-700 text-sm">Note: Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        </div>
        <div className="flex items-center pt-3 md:pt-0 items-center justify-center">
          <div className="font-medium mr-1 text-xl text-gray-700 mb-2 pt-2">Quality:</div>
          <input
            type='number'
            min="0"
            max="100"
            value={quality}
            onChange={(e) => setQuality((e.target.value))}
            className="border-2 border-primary-500 rounded-md text-primary-700 bg-primary-300 focus:outline-0 px-1 mr-2 py-2 font-bold"
          />
          <div className="font-medium mr-5 text-xl text-gray-700 mb-2 pt-2">Convert to:</div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border-2 border-primary-500 rounded-md text-primary-700 bg-primary-300 focus:outline-0 px-6 py-2 font-bold"
          >
            {fileOptions.map((data, index) => (
              <option key={index} value={data.value}>
                {data.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        {...getRootProps({
          className:
            'min-h-300 flex flex-wrap cursor-pointer relative text-center items-center justify-center p-4 mb-6 rounded border-2 border-dashed focus:outline-0',
        })}
      >
        <input {...getInputProps()} type="im*" />
        <Image src="/upload.png" alt="upload" width={350} height={300} />
        <div>
          <h4 className="text-xl font-medium text-gray-500 mb-3">
            {!isDragActive ? 'Drag’n’drop files here or click to upload.' : 'Drop file(s) here ...'}
          </h4>
          <p className="text-md font-normal text-gray-400 ">
            Drop files here or click{' '}
            <Link href="/" onClick={handleLinkClick} className="text-primary-500">
              {' '}
              browser
            </Link>{' '}
            through your machine.
          </p>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <div className="flex md:grid gap-4 pr-3 mr-[-20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-h-80 overflow-y-auto mb-5 ">
            {fileList}
          </div>
          {/* <div className='flex gap-4 overflow-x-auto '>{fileList}</div> */}
          <div className="flex justify-end mt-6 ">
            <Button
              onClick={handleRemoveAllFiles}
              classNames="bg-red-700 mr-4 text-red-100 border-red-300 hover:text-red-700 hover:bg-red-500 "
              variant="outlined"
            >
              Remove All
            </Button>
            <Button variant="contained" onClick={handleDownloadAll}>Download All Files</Button>
          </div>
        </Fragment>
      ) : null}
    </main>
  );
};

export default FileUploader;
