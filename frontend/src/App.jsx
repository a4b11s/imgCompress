import React, { useState } from 'react';

import ImgInput from './Component/ImgInput';
import Spinner from './Component/Spinner';
import Alert from './Component/Alert';

import './App.css';

const url =
  process.env.REACT_APP_BACKEND_HOST + process.env.REACT_APP_BACKEND_IMG_COMPRESS_ENDPOINT;

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState('');
  const [isError, setIsError] = useState(false);

  function handleError(e) {
    setIsError(true);
    setIsUploading(false);
    console.log(e);
    setTimeout(() => setIsError(false), 8000);
  }

  function handleFile(files) {
    const formData = new FormData();

    setUploadData('');
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i]);
    }

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((data) => {
        data
          .arrayBuffer()
          .then((buffer) => {
            let blob = new Blob(new Uint8Array(buffer));
            setUploadData(blob);
            setIsUploading(false);
          })
          .catch((e) => {
            handleError(e);
          });
      })
      .catch((e) => {
        handleError(e);
      });
  }

  return (
    <div className='container'>
      {isUploading ? <Spinner /> : <ImgInput callback={handleFile} />}
      <Alert isOpen={isError} message='Fetching error' />
      {uploadData && (
        <a download='image.zip' className='downloadBtn' href={uploadData}>
          Download
        </a>
      )}
    </div>
  );
}

export default App;
