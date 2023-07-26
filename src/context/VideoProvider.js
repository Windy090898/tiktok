import React, { createContext, useEffect, useState } from 'react';
import * as services from '~/services/services';
export const VideoContext = createContext();

function VideoProvider({ children }) {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);
  return (
    <VideoContext.Provider value={{ play, setPlay, volume, setVolume }}>
      {children}
    </VideoContext.Provider>
  );
}

export default VideoProvider;
