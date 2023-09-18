import React, { useContext, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';

import { CloseIcon, PhotoEditIcon } from '~/components/Icon';
import Modal from '~/components/Modal/Modal';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { AuthContext } from '~/context/AuthProvider';
import * as authServices from '~/services/authServices';

const cx = classNames.bind(styles);

function EditProfileModal({ showModal, setShowModal, setUser }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { nickname, avatar, first_name, bio } = currentUser;
  const [editAvatar, setEditAvatar] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const changeImgInput = useRef();

  // set value for edit profile modal
  useEffect(() => {
    setEditAvatar(avatar);
    setEditUsername(nickname);
    setEditFirstName(first_name);
    setEditBio(bio);
  }, [currentUser]);

  // active save button of the modal when any value change
  useEffect(() => {
    if (
      (editAvatar && editAvatar !== avatar) ||
      (editUsername && editUsername !== nickname) ||
      (editFirstName && editFirstName !== first_name) ||
      (editBio && editBio !== bio)
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [editAvatar, editUsername, editFirstName, editBio]);

  // revoke image URL when change img
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(editAvatar);
    };
  }, [editAvatar]);

  const closeEditModal = () => {
    setShowModal(false);
  };

  const handleOpenFileInput = () => {
    changeImgInput.current.click();
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
    const imgUrl = URL.createObjectURL(file);
    setEditAvatar(imgUrl);
  };

  const handleChangeUsername = (e) => {
    setEditUsername(e.target.value);
  };

  const handleChangeName = (e) => {
    setEditFirstName(e.target.value);
  };

  const handleChangeBio = (e) => {
    setEditBio(e.target.value);
  };

  const handleEditProfile = () => {
    const updateUser = async () => {
      const formData = new FormData();
      editAvatar !== avatar && formData.append('avatar', selectedImg);
      editUsername !== nickname && formData.append('nickname', editUsername);
      editFirstName !== first_name &&
        formData.append('first_name', editFirstName);
      editBio !== bio && formData.append('bio', editBio);
      const response = await authServices.updateCurrentUser(formData);
      setCurrentUser(response);
      setUser(response)
      setShowModal(false);
    };
    updateUser();
  };
  return (
    <Modal modalState={[showModal, setShowModal]}>
      <div className={cx('edit-profile-modal')}>
        <div className={cx('edit-profile-header', 'bottom-line')}>
          <span>Edit Profile</span>
          <button onClick={closeEditModal}>
            <CloseIcon />
          </button>
        </div>
        <div className={cx('edit-profile-content')}>
          <div className={cx('bottom-line')}>
            <span className={cx('content-label')}>Profile Photo</span>
            <div className={cx('edit-image')} onClick={handleOpenFileInput}>
              <Image src={editAvatar} className={cx('image')}></Image>
              <div className={cx('edit-icon')}>
                <PhotoEditIcon />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={changeImgInput}
              onChange={handleChangeAvatar}
            />
          </div>
          <div className={cx('bottom-line')}>
            <span className={cx('content-label')}>Username</span>
            <div className={cx('content-edit-area')}>
              <input
                type="text"
                placeholder="Username"
                className={cx('edit-input-text', 'username')}
                value={editUsername}
                onInput={handleChangeUsername}
                disabled
              />
              <p className={cx('username-link')}>
                www.tiktok.com/@{editUsername}
              </p>
              <p>
                Usernames can only contain letters, numbers, underscores, and
                periods. Changing your username will also change your profile
                link.
              </p>
            </div>
          </div>
          <div className={cx('bottom-line')}>
            <span className={cx('content-label')}>Name</span>
            <div className={cx('content-edit-area')}>
              <input
                type="text"
                placeholder="Name"
                className={cx('edit-input-text')}
                value={editFirstName}
                onInput={handleChangeName}
              />
              <p>Your nickname can only be changed once every 7 days.</p>
            </div>
          </div>
          <div className={cx('bottom-line')}>
            <span className={cx('content-label')}>Bio</span>
            <div className={cx('content-edit-area')}>
              <textarea
                type="text"
                placeholder="Bio"
                className={cx('edit-input-text', 'edit-bio')}
                value={editBio}
                onInput={handleChangeBio}
              />
              <p>0/80</p>
            </div>
          </div>
        </div>
        <div className={cx('edit-profile-footer')}>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button primary disabled={disableSubmit} onClick={handleEditProfile}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
