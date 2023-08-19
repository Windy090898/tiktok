import React, { useState } from 'react'
import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';
import { MentionIcon, SmileIcon } from '~/components/Icon';
import Tippy from '@tippyjs/react';
import { useParams } from 'react-router-dom';
import * as commentServices from '~/services/commentServices';

const cx = classNames.bind(styles);

function CommentBottom({ setComment, lastestComment, setCommentCount }) {
  const { uuid } = useParams();
  const [commentValue, setCommentValue] = useState('');

  const handleInputComment = (e) => {
    setCommentValue(e.target.value);
  };
  const handleCreateComment = async () => {
    let response = await commentServices.createComment(uuid, {
      comment: commentValue,
    });
    setComment(response);
    setCommentCount(prev => prev + 1)
    setCommentValue('');
    handleScrollIntoView();
  };

  const handleScrollIntoView = () => {
    lastestComment.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={cx('bottom-comment-container')}>
      <div className={cx('create-comment-container')}>
        <input
          type="text"
          className={cx('comment-input')}
          placeholder="Enter comment..."
          value={commentValue}
          onInput={handleInputComment}
          onKeyUp={(e) => e.key == 'Enter' && handleCreateComment()}
          onFocus={handleScrollIntoView}
        />
        <Tippy content='"@" a user to tag them in your comments'>
          <div className={cx('comment-icon')}>
            <MentionIcon />
          </div>
        </Tippy>
        <Tippy content="Click to add emojis">
          <div className={cx('comment-icon')}>
            <SmileIcon />
          </div>
        </Tippy>
      </div>
      <button
        className={cx('comment-btn', { active: commentValue.length > 0 })}
        disabled={commentValue.length === 0}
        onClick={handleCreateComment}
      >
        Post
      </button>
    </div>
  );
}

export default CommentBottom