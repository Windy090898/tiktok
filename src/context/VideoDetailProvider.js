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
  const [commentCount, setCommentCount] = useState(0);

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
      setCommentCount(response.comments_count);
    };
    if (uuid) {
      getVideo();
    }
  }, [uuid]);

  useEffect(() => {
    const getVideo = async () => {
      const response = await videoServices.getVideo(uuid);
      setVideoLikeCount(response.likes_count);
      setTotalVideoLike(response.user.likes_count);
    };
    if (uuid) {
      getVideo();
    }
  }, [videoLikeCount]);

  

  // useEffect(() => {
  //   const getVideo = async () => {
  //     const response = await videoServices.getVideo(uuid);
  //     setCommentCount(response.comments_count);
  //   };
  //   getVideo();
  // }, [commentCount]);

  if (video && author) {
    return (
      <VideoDetailContext.Provider
        value={{
          video,
          setVideo,
          author,
          setAuthor,
          authorIsFollow,
          setAuthorIsFollow,
          authorFollowCount,
          setAuthorFollowCount,
          convertDate,
          videoLikeCount,
          setVideoLikeCount,
          totalVideoLike,
          setTotalVideoLike,
          commentCount,
          setCommentCount,
        }}
      >
        {children}
      </VideoDetailContext.Provider>
    );
  }
}

export default VideoDetailProvider;
