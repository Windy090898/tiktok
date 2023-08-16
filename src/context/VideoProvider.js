import React, {
  createContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import * as services from '~/services/services';


import * as videoServices from '~/services/videoServices';
import { useElementOnBottom } from '~/hooks';
import { useLocation } from 'react-router-dom';
export const VideoContext = createContext();

function VideoProvider({ children }) {
const location = useLocation();
const pathName = location.pathname.slice(1);

const videoType = pathName ? pathName : 'for-you';

const [videoList, setVideoList] = useState([]);
const [page, setPage] = useState(null);
const [endPage, setEndPage] = useState();
const [totalPage, setTotalPage] = useState(null);

useEffect(() => {
  const setRandomPage = async () => {
    let response = await videoServices.videoList(videoType, 1);
    let { total_pages } = response.meta.pagination;
    setTotalPage(total_pages);
    setPage(Math.floor(Math.random() * total_pages));
  };
  setRandomPage();
}, []);

useEffect(() => {
  const getVideoList = async () => {
    let response = await videoServices.videoList(videoType, page);
    const newList = [...videoList, ...response.data];
    setVideoList(newList);
    setEndPage(newList.length - 1);
  };
  if (page) {
    getVideoList();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);

const lastVideoRef = useRef();
const options = {
  threshold: 0.6,
};
let isBottom = useElementOnBottom(lastVideoRef, options);

useEffect(() => {
  if (isBottom) {
    setPage((prev) => {
      const nextPage = prev + 1;
      if (nextPage > totalPage) {
        return 1;
      }
      return nextPage;
    });
  }
}, [isBottom]);
  return (
    <VideoContext.Provider >
      {children}
    </VideoContext.Provider>
  );
}

export default VideoProvider;
