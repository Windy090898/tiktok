import React, { useState } from 'react'
import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';
import { MentionIcon, SmileIcon } from '~/components/Icon';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function CommentBottom() {
    const [comment, setComment] = useState('');
    const handleInputComment = (e) => {
      setComment(e.target.value);
    };
  return (
    <div className={cx('bottom-comment-container')}>
      <div className={cx('create-comment-container')}>
        <input
          type="text"
          className={cx('comment-input')}
          placeholder="Enter comment..."
          value={comment}
          onInput={handleInputComment}
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
        className={cx('comment-btn', { active: comment.length > 0 })}
        disabled={comment.length === 0}
      >
        Post
      </button>
    </div>
  );
}

export default CommentBottom