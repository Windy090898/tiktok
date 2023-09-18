import { createContext, useState } from 'react';

export const VideosContext = createContext();

function VideoListProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [prevPage, setPrevPage] = useState()

  return (
    <VideosContext.Provider
      value={{ videos, setVideos, prevPage, setPrevPage }}
    >
      {children}
    </VideosContext.Provider>
  );
}

export default VideoListProvider;
