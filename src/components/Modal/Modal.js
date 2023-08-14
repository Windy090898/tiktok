import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ modalState, children }) {
    const modalRef = useRef();
    const [ showModal, setShowModal ] = modalState

    useEffect(() => {
      window.addEventListener('click', (e) => {
        if (e.target === modalRef.current) {
          setShowModal(false);
        }
      });
    }, [setShowModal]);

    if (showModal) {
        return (
          <div className={cx('wrapper')} ref={modalRef}>
            <div className={cx('content-container')}>{children}</div>
          </div>
        );
    }
}

export default Modal