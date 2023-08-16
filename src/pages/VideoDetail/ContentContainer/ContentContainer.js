import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';
import * as commentServices from '~/services/commentServices';

import Image from '~/components/Image';
import CommentBottom from './CommentBottom';
import TabMenu from '../TabMenu';

const cx = classNames.bind(styles);

function ContentContainer({ user, video }) {
  const [commentList, setCommentList] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [borderDisplay, setBorderDisplay] = useState(false);

  useEffect(() => {
    const getCommentList = async () => {
      let response = await commentServices.getCommentList(video.id);
      setCommentList(response.data);
      setTotalComments(response.meta.pagination.total);
    };
    if (video) {
      getCommentList();
    }
  }, [video]);

  const convertDate = (date) => {
    const newDate = new Date(date);
    return [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()].join('-');
  };

  const commentsRef = useRef();

  useEffect(() => {
    commentsRef.current.onscroll = () => {
      if (commentsRef.current.scrollTop > 0) {
        setBorderDisplay(true);
      } else {
        setBorderDisplay(false);
      }
    };
  }, []);

  return (
    <section className={cx('content-container')}>
      <div className={cx('comment-container')}>
        <div className={cx('comment-list-container')} ref={commentsRef}>
          <TabMenu
            user={user}
            video={video}
            convertDate={convertDate}
            totalComments={totalComments}
            borderDisplay={borderDisplay}
          />
          <div className={cx('comment-wrapper')}>
            {/* Render comment list in reverse order, because in API data is from lastest to oldest */}
            {commentList.slice(0).reverse().map((comment) => (
              <div className={cx('comment-item')} key={comment.id}>
                <Image
                  src={comment.user.avatar}
                  alt=""
                  className={cx('avatar')}
                ></Image>
                <div className={cx('comment-content')}>
                  <div className={cx('nickname')}>
                    {comment.user.nickname}
                    {comment.user.tick && (
                      <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCircleCheck}
                      />
                    )}
                  </div>
                  <div className={cx('comment')}>{comment.comment}</div>
                  <div className={cx('reply')}>
                    <div className={cx('comment-date')}>
                      {convertDate(comment.updated_at)}
                    </div>
                    <div>Reply</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CommentBottom />
    </section>
  );
}

export default ContentContainer;
