import { createContext, useState } from 'react';

export const UploadContext = createContext();

function UploadProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState();
  const [videoSource, setVideoSource] = useState();
  const [covers, setCovers] = useState([]);
  const [fileName, setFileName] = useState('');

  return (
    <UploadContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        videoSource,
        setVideoSource,
        covers,
        setCovers,
        fileName,
        setFileName,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export default UploadProvider;
