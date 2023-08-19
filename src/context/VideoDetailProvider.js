import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as videoServices from '~/services/videoServices';

export const VideoDetailContext = createContext();

function VideoDetailProvider({ children }) {
  const { uuid } = useParams();
  const [video, setVideo] = useState();
  const [author, setAuthor] = useState();
  const [authorIsFollow, setAuthorIsFollow] = useState(0);
  const [authorFollowCount, setAuthorFollowCount] = useState(0);
  const [videoLikeCount, setVideoLikeCount] = useState(0);
  const [totalVideoLike, setTotalVideoLike] = useState(0);

  const convertDate = useCallback((date) => {
    const newDate = new Date(date);
    return [
      newDate.getDate(),
      newDate.getMonth() + 1,
      newDate.getFullYear(),
    ].join('-');
  }, []);

  useEffect(() => {
    const getVideo = async () => {
      const response = await videoServices.getVideo(uuid);
      setVideo(response);
      setAuthor(response.user);
      setAuthorIsFollow(response.user.is_followed);
      setAuthorFollowCount(response.user.followers_count);
      setVideoLikeCount(response.likes_count);
      setTotalVideoLike(response.user.likes_count);
    };
    getVideo();
  }, [videoLikeCount]);

//   useEffect(() => {
//       if (author) {
//         setTotalVideoLike(author.likes_count);
//     }
//   }, [videoLikeCount]);
  if (video && author) {
    return (
      <VideoDetailContext.Provider
        value={{
          video,
          author,
          authorIsFollow,
          setAuthorIsFollow,
          authorFollowCount,
          setAuthorFollowCount,
          convertDate,
          videoLikeCount,
          setVideoLikeCount,
          totalVideoLike,
        }}
      >
        {children}
      </VideoDetailContext.Provider>
    );
  }
}

export default VideoDetailProvider;
