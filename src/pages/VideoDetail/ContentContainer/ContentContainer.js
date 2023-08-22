import React, { useContext, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';
import * as commentServices from '~/services/commentServices';

import CommentBottom from './CommentBottom';
import TabMenu from '../TabMenu';
import CommentItem from './CommentItem';
import { VideoDetailContext } from '~/context/VideoDetailProvider';
import { IS_LOGIN, storage } from '~/storage';
import Button from '~/components/Button/Button';
import { AuthContext } from '~/context/AuthProvider';

const cx = classNames.bind(styles);

function ContentContainer() {
  const { video } = useContext(VideoDetailContext);
  const { setShowModal } = useContext(AuthContext);
  const [commentList, setCommentList] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [borderDisplay, setBorderDisplay] = useState(false);
  const [comment, setComment] = useState('');
  // const [commentCount, setCommentCount] = useState(video.comments_count);
  const lastestComment = useRef();
  const commentsRef = useRef();

  const isLogin = storage.get(IS_LOGIN)

  useEffect(() => {
    const getCommentList = async () => {
      let response = await commentServices.getCommentList(video.id);
      if (response) {
        setCommentList(response.data);
        // setTotalComments(response.meta.pagination.total);
      }
    };
    if (video) {
      getCommentList();
    }
  }, [video, comment]);

  useEffect(() => {
    commentsRef.current.onscroll = () => {
      if (commentsRef.current.scrollTop > 0) {
        setBorderDisplay(true);
      } else {
        setBorderDisplay(false);
      }
    };
  }, []);

  const renderCommentList = () => {
    if (isLogin) {
      return commentList.length > 0 ? (
        <div className={cx('comment-wrapper')}>
          {/* Render comment list in reverse order, because in API data is from lastest to oldest */}
          {commentList
            .slice(0)
            .reverse()
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          <div ref={lastestComment} style={{ appearance: 'none' }}></div>
        </div>
      ) : (
        <div className={cx('no-comment')}>
          Hãy là người đầu tiên bình luận!
        </div>
      );
    } else {
      return (
        <div className="not-login-message ">
          <Button outline onClick={() => setShowModal(true)}>
            Log in
          </Button>{' '}
          to view and add comment
        </div>
      );
    }
  };

  return (
    <section className={cx('content-container')}>
      <div className={cx('comment-container')}>
        <div className={cx('comment-list-container')} ref={commentsRef}>
          <TabMenu borderDisplay={borderDisplay}  />
          {renderCommentList()}
          
        </div>
      </div>

      {isLogin && (
        <CommentBottom
          setComment={setComment}
          lastestComment={lastestComment}
          // setCommentCount={setCommentCount}
        />
      )}
    </section>
  );
}

export default ContentContainer;
