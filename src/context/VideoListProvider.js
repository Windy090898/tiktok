import { createContext, useCallback, useEffect, useState } from 'react';
import * as authServices from '~/services/authServices';
import { IS_LOGIN, storage } from '~/storage';

export const VideosContext = createContext();

function VideoListProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [prevPage, setPrevPage] = useState()
    // console.log(videos)
  
  return (
    <VideosContext.Provider
      value={{ videos, setVideos, prevPage, setPrevPage }}
    >
      {children}
    </VideosContext.Provider>
  );
}

export default VideoListProvider;
