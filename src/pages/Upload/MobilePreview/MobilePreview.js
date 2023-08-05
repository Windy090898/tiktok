import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';

import classNames from 'classnames/bind';
import styles from './MobilePreview.module.scss';
import Image from '~/components/Image';
import { AuthContext } from '~/context/AuthProvider';
import { UploadContext } from '~/context/UploadProvider';

const cx = classNames.bind(styles);

function MobilePreview({ description, music }) {
  const { videoSource, fileName } = useContext(UploadContext);
  
  const [playing, setPlaying] = useState(false);
  const [playedPct, setPlayPct] = useState(0);
  const [playedSeconds, setPlayingSeconds] = useState({});
  const [totalSeconds, setTotalSeconds] = useState({});
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const handleConvertTime = (inputSeconds) => {
    let hours = (inputSeconds / 3600).toFixed() || 0;
    hours = hours.length === 1 ? `0${hours}` : hours;
    let minutes = ((inputSeconds % 3600) / 60).toFixed() || 0;
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    let seconds = (inputSeconds % 60).toFixed() || 0;
    seconds = seconds.length === 1 ? `0${seconds}` : seconds;
    return { hours, minutes, seconds };
  };

  const mobilePreviewRef = useRef();

  const { currentUser } = useContext(AuthContext);

  const handlePlayerProgress = useCallback((state) => {
    setPlayPct(state.played * 100);
    let playedSeconds = state.playedSeconds.toFixed();
    let loadedSeconds = state.loadedSeconds.toFixed();
    setPlayingSeconds(handleConvertTime(playedSeconds));
    setTotalSeconds(handleConvertTime(loadedSeconds));
  }, []);
  const handlePlayControl = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const handleChangePlayedTime = useCallback(
    (e) => {
      setPlayPct(e.target.value);
      mobilePreviewRef.current.seekTo(playedPct / 100, 'fraction');
      let playedSeconds = mobilePreviewRef.current.getCurrentTime();
      setPlayingSeconds(handleConvertTime(playedSeconds));
    },
    [playedPct],
  );

  const handleVolume = useCallback(() => {
    setMuted(!muted);
    setVolume((prev) => (prev === 1 ? 0 : 1));
  }, [muted]);

  const handleFullScreen = () => {
    screenfull.request(findDOMNode(mobilePreviewRef.current));
  };

  return (
    <div className={cx('mobile-preview')}>
      <div className={cx('header')}>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI1NzFfMTI5MjMpIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9kXzI1NzFfMTI5MjMpIj4KPHBhdGggZD0iTTguNTgyMTEgMS43MDI2MUwxMC42MjQzIDQuMDAwMTJINC41OTcxN0MzLjYxOTUgNC4wMDAxMiAyLjc4NTEyIDQuNzA2OTUgMi42MjQzOSA1LjY3MTMyTDIuMzYwNjkgNy4yNTM1MkMyLjMwOTg5IDcuNTU4MjkgMi41NDQ5MSA3LjgzNTcyIDIuODUzODggNy44MzU3MkgzLjg2NzY4QzQuMTEyMSA3LjgzNTcyIDQuMzIwNjkgNy42NTkwMiA0LjM2MDg3IDcuNDE3OTJMNC41NjIzNiA2LjIwOTAyQzQuNTgyNDUgNi4wODg0OCA0LjY4Njc1IDYuMDAwMTIgNC44MDg5NiA2LjAwMDEySDIxLjE5MTFDMjEuMzEzMyA2LjAwMDEyIDIxLjQxNzYgNi4wODg0OCAyMS40Mzc3IDYuMjA5MDJMMjEuNjM5MiA3LjQxNzkyQzIxLjY3OTQgNy42NTkwMiAyMS44ODggNy44MzU3MiAyMi4xMzI0IDcuODM1NzJIMjMuMTQ2MkMyMy40NTUyIDcuODM1NzIgMjMuNjkwMiA3LjU1ODI5IDIzLjYzOTQgNy4yNTM1MkwyMy4zNzU3IDUuNjcxMzJDMjMuMjE1IDQuNzA2OTUgMjIuMzgwNiA0LjAwMDEyIDIxLjQwMjkgNC4wMDAxMkgxNS4zNzAzTDE3LjQxMjYgMS43MDI2MUMxNy41OTYgMS40OTYyMSAxNy41Nzc0IDEuMTgwMTggMTcuMzcxIDAuOTk2NzE5TDE2LjYyMzYgMC4zMzIzNTZDMTYuNDE3MiAwLjE0ODg5NiAxNi4xMDEyIDAuMTY3NDg3IDE1LjkxNzcgMC4zNzM4NzhMMTIuOTk3MyAzLjY1OTM0TDEwLjA3NjkgMC4zNzM4NzhDOS44OTM0NyAwLjE2NzQ4NyA5LjU3NzQzIDAuMTQ4ODk2IDkuMzcxMDQgMC4zMzIzNTVMOC42MjM2MyAwLjk5NjcxOUM4LjQxNzI0IDEuMTgwMTggOC4zOTg2NSAxLjQ5NjIxIDguNTgyMTEgMS43MDI2MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMC40NTA1IDkuODUwMTJDMjAuMTc0NCA5Ljg1MDEyIDE5Ljk1MDUgMTAuMDc0IDE5Ljk1MDUgMTAuMzUwMVYxNy4zNTAxQzE5Ljk1MDUgMTcuNjI2MyAyMC4xNzQ0IDE3Ljg1MDEgMjAuNDUwNSAxNy44NTAxSDI0LjE1QzI0LjQyNjEgMTcuODUwMSAyNC42NSAxNy42MjYzIDI0LjY1IDE3LjM1MDFWMTYuMzUwMUMyNC42NSAxNi4wNzQgMjQuNDI2MSAxNS44NTAxIDI0LjE1IDE1Ljg1MDFIMjEuOTcyNVYxNC44NTAxSDI0LjE1QzI0LjQyNjEgMTQuODUwMSAyNC42NSAxNC42MjYzIDI0LjY1IDE0LjM1MDFWMTMuMzUwMUMyNC42NSAxMy4wNzQgMjQuNDI2MSAxMi44NTAxIDI0LjE1IDEyLjg1MDFIMjEuOTcyNVYxMS44NTAxSDI0LjE1QzI0LjQyNjEgMTEuODUwMSAyNC42NSAxMS42MjYzIDI0LjY1IDExLjM1MDFWMTAuMzUwMUMyNC42NSAxMC4wNzQgMjQuNDI2MSA5Ljg1MDEyIDI0LjE1IDkuODUwMTJIMjAuNDUwNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yIDkuODUwMTJDMS43MjM4NiA5Ljg1MDEyIDEuNSAxMC4wNzQgMS41IDEwLjM1MDFWMTcuMzUwMUMxLjUgMTcuNjI2MyAxLjcyMzg2IDE3Ljg1MDEgMiAxNy44NTAxSDUuODAyMkM2LjA3ODM0IDE3Ljg1MDEgNi4zMDIyIDE3LjYyNjMgNi4zMDIyIDE3LjM1MDFWMTYuMzUwMUM2LjMwMjIgMTYuMDc0IDYuMDc4MzQgMTUuODUwMSA1LjgwMjIgMTUuODUwMUgzLjUyMTk4VjEwLjM1MDFDMy41MjE5OCAxMC4wNzQgMy4yOTgxMiA5Ljg1MDEyIDMuMDIxOTggOS44NTAxMkgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcuNTY1OTMgMTcuMzUwMUM3LjU2NTkzIDE3LjYyNjMgNy43ODk3OSAxNy44NTAxIDguMDY1OTMgMTcuODUwMUg5LjA4NzkxQzkuMzY0MDUgMTcuODUwMSA5LjU4NzkxIDE3LjYyNjMgOS41ODc5MSAxNy4zNTAxVjEwLjM1MDFDOS41ODc5MSAxMC4wNzQgOS4zNjQwNSA5Ljg1MDEyIDkuMDg3OTEgOS44NTAxMkg4LjA2NTkzQzcuNzg5NzkgOS44NTAxMiA3LjU2NTkzIDEwLjA3NCA3LjU2NTkzIDEwLjM1MDFWMTcuMzUwMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNC45ODY3IDE1Ljg2MjZIMTQuNzQwMkwxMy4wOTkzIDEwLjIxMDdDMTMuMDM3MyA5Ljk5NzA5IDEyLjg0MTYgOS44NTAxMiAxMi42MTkyIDkuODUwMTJIMTEuNTkwOEMxMS4yNTc3IDkuODUwMTIgMTEuMDE3OCAxMC4xNjk3IDExLjExMDYgMTAuNDg5NUwxMy4xNDI5IDE3LjQ4OTVDMTMuMjA0OSAxNy43MDMyIDEzLjQwMDYgMTcuODUwMSAxMy42MjMxIDE3Ljg1MDFIMTYuMTAzOEMxNi4zMjYzIDE3Ljg1MDEgMTYuNTIyIDE3LjcwMzIgMTYuNTg0IDE3LjQ4OTVMMTguNjE2MiAxMC40ODk1QzE4LjcwOTEgMTAuMTY5NyAxOC40NjkxIDkuODUwMTIgMTguMTM2MSA5Ljg1MDEySDE3LjEwNzdDMTYuODg1MyA5Ljg1MDEyIDE2LjY4OTYgOS45OTcwOSAxNi42Mjc2IDEwLjIxMDdMMTQuOTg2NyAxNS44NjI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIzLjM3NTkgMjEuOTE0NUMyMy4yMTUxIDIyLjg3ODkgMjIuMzgwNyAyMy41ODU3IDIxLjQwMzEgMjMuNTg1N0w0LjU5NzMzIDIzLjU4NTdDMy42MTk2NSAyMy41ODU3IDIuNzg1MjcgMjIuODc4OSAyLjYyNDU0IDIxLjkxNDVMMi4zNjA4NCAyMC4zMzIzQzIuMzEwMDQgMjAuMDI3NiAyLjU0NTA3IDE5Ljc1MDEgMi44NTQwNCAxOS43NTAxSDMuODY3ODNDNC4xMTIyNSAxOS43NTAxIDQuMzIwODQgMTkuOTI2OCA0LjM2MTAzIDIwLjE2NzlMNC41NjI1MSAyMS4zNzY4QzQuNTgyNiAyMS40OTc0IDQuNjg2OSAyMS41ODU3IDQuODA5MTEgMjEuNTg1N0wyMS4xOTEzIDIxLjU4NTdDMjEuMzEzNSAyMS41ODU3IDIxLjQxNzggMjEuNDk3NCAyMS40Mzc5IDIxLjM3NjhMMjEuNjM5NCAyMC4xNjc5QzIxLjY3OTYgMTkuOTI2OCAyMS44ODgxIDE5Ljc1MDEgMjIuMTMyNiAxOS43NTAxSDIzLjE0NjRDMjMuNDU1MyAxOS43NTAxIDIzLjY5MDQgMjAuMDI3NiAyMy42Mzk2IDIwLjMzMjNMMjMuMzc1OSAyMS45MTQ1WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzI1NzFfMTI5MjMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xMiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzI1NzFfMTI5MjMiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMjU3MV8xMjkyMyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yNTcxXzEyOTIzIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
          alt="live"
        />
        <div className={cx('title-tab')}>
          <span>Following</span>
          <span className={cx('active')}>For You </span>
        </div>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNSAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8yNTcxXzEyOTI3KSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuNjMxNiAzLjVDNi40MTY3NyAzLjUgMyA2LjkxNjc3IDMgMTEuMTMxNkMzIDE1LjM0NjQgNi40MTY3NyAxOC43NjMyIDEwLjYzMTYgMTguNzYzMkMxNC44NDY0IDE4Ljc2MzIgMTguMjYzMiAxNS4zNDY0IDE4LjI2MzIgMTEuMTMxNkMxOC4yNjMyIDYuOTE2NzcgMTQuODQ2NCAzLjUgMTAuNjMxNiAzLjVaTTEgMTEuMTMxNkMxIDUuODEyMiA1LjMxMjIgMS41IDEwLjYzMTYgMS41QzE1Ljk1MSAxLjUgMjAuMjYzMiA1LjgxMjIgMjAuMjYzMiAxMS4xMzE2QzIwLjI2MzIgMTMuNDMxMSAxOS40NTczIDE1LjU0MjQgMTguMTEyNyAxNy4xOTg0TDIyLjk0MTkgMjIuMDI3N0MyMy4wODg0IDIyLjE3NDIgMjMuMDg4NCAyMi40MTE2IDIyLjk0MTkgMjIuNTU4MUwyMi4wNTgxIDIzLjQ0MTlDMjEuOTExNiAyMy41ODg0IDIxLjY3NDIgMjMuNTg4NCAyMS41Mjc3IDIzLjQ0MTlMMTYuNjk4NCAxOC42MTI3QzE1LjA0MjQgMTkuOTU3MyAxMi45MzExIDIwLjc2MzIgMTAuNjMxNiAyMC43NjMyQzUuMzEyMiAyMC43NjMyIDEgMTYuNDUxIDEgMTEuMTMxNloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8yNTcxXzEyOTI3IiB4PSItMSIgeT0iMCIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMC41Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEyIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMjU3MV8xMjkyNyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18yNTcxXzEyOTI3IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo="
          alt="search"
        />
      </div>
      <div className={cx('video-container')} onClick={handlePlayControl}>
        <div className={cx('video-overlay')}>
          <ReactPlayer
            ref={mobilePreviewRef}
            playing={playing}
            loop
            url={videoSource}
            volume={volume}
            muted={muted}
            className={cx('video')}
            width={'100%'}
            height={'100%'}
            onProgress={handlePlayerProgress}
          />
          <div className={cx('user-data')}>
            <div className={cx('username')}>@{currentUser.nickname}</div>
            <div className={cx('caption')}>{description}</div>
            <div className={cx('music')}>
              <div className={cx('music-icon')}></div>
              <div className={cx('sound')}>
                <p>{music ?? `${currentUser.nickname} Orginal Sound`}</p>
              </div>
            </div>
          </div>
          <div className={cx('sidebar')}>
            <div className={cx('avatar')}>
              <Image src="" alt=""></Image>
            </div>
            <div className={cx('music-icon')}>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iMTI1IiB2aWV3Qm94PSIwIDAgMjkgMTI1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuNzAzMTMgMy41ODI2NEMxMy4yMDMxIDMuNTgyNjQgMTQuOTUzMSA1LjkxNTk3IDE0Ljk1MzEgNS45MTU5N0MxNC45NTMxIDUuOTE1OTcgMTYuNzAzMSAzLjU4MjY0IDIwLjIwMzEgMy41ODI2NEMyNC4yODY1IDMuNTgyNjQgMjcuMjAzMSA2Ljc5MDk2IDI3LjIwMzEgMTAuODc0M0MyNy4yMDMxIDE1LjU0MSAyMy4zODk0IDE5LjcwMSAxOS45MTE1IDIyLjgzMjZDMTcuNzY0MyAyNC43NjYxIDE2LjExOTggMjYuMDQxIDE0Ljk1MzEgMjYuMDQxQzEzLjc4NjUgMjYuMDQxIDEyLjA5NTQgMjQuNzU2NCA5Ljk5NDc5IDIyLjgzMjZDNi41NzU4NiAxOS43MDE2IDIuNzAzMTIgMTUuNTQxIDIuNzAzMTIgMTAuODc0M0MyLjcwMzEyIDYuNzkwOTYgNS42MTk3OSAzLjU4MjY0IDkuNzAzMTMgMy41ODI2NFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOSIvPgo8L2c+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMy43NTU4NiAxNS4xOTExQzUuMTQwOTggMTguMTAzOSA3LjY3Mjc3IDIwLjcwNTggOS45OTUxNiAyMi44MzI3QzEyLjA5NTggMjQuNzU2NCAxMy43ODY4IDI2LjA0MSAxNC45NTM1IDI2LjA0MUMxNi4xMjAyIDI2LjA0MSAxNy43NjQ2IDI0Ljc2NjEgMTkuOTExOCAyMi44MzI3QzIzLjM4OTggMTkuNzAxIDI3LjIwMzUgMTUuNTQxIDI3LjIwMzUgMTAuODc0M0MyNy4yMDM1IDEwLjc3MjMgMjcuMjAxNyAxMC42NzA4IDI3LjE5ODEgMTAuNTY5OEMyNC45NDg4IDE2Ljg5NjQgMTYuOTEyIDIyLjU0MSAxNC42NjE4IDIyLjU0MUMxMi45ODUgMjIuNTQxIDcuNDk5NzggMTkuNDA2NSAzLjc1NTg2IDE1LjE5MTFaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+CjwvZz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxKSI+CjxnIG9wYWNpdHk9IjAuOSIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFfZCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIzLjQwODEgNjkuNTU2OEMyNS44MDMxIDY3LjE1NzYgMjcuMjAzMSA2NC42NTg3IDI3LjIwMzEgNjEuNzQ4OUMyNy4yMDMxIDU1Ljg0NDIgMjEuNzk3NCA1MS4wNTc2IDE1LjEyODEgNTEuMDU3NkM4LjQ1ODkzIDUxLjA1NzYgMy4wNTMxMyA1NS44NDQyIDMuMDUzMTMgNjEuNzQ5MUMzLjA1MzEzIDY3LjY1NCA4LjYzMzgzIDcxLjcwNzYgMTUuMzAzMSA3MS43MDc2VjcyLjcwNjdDMTUuMzAzMSA3My43NzAzIDE2LjQwNzMgNzQuNDQ5NCAxNy4zMzE4IDczLjkyMzVDMTkuMTAzIDcyLjkxNiAyMS42NTcyIDcxLjMxMDcgMjMuNDA4MSA2OS41NTY4Wk05LjI2MjUgNjAuMzA3MkMxMC4yMTU2IDYwLjMwNzIgMTAuOTg4MyA2MS4wNzQzIDEwLjk4ODMgNjIuMDE5MUMxMC45ODgzIDYyLjk2NTkgMTAuMjE1NiA2My43MzI5IDkuMjYyNSA2My43MzI5QzguMzEwOTcgNjMuNzMyOSA3LjUzODI4IDYyLjk2NTkgNy41MzgyOCA2Mi4wMTkxQzcuNTM4MjggNjEuMDc0MyA4LjMxMDk3IDYwLjMwNzIgOS4yNjI1IDYwLjMwNzJaTTE2Ljg1MTYgNjIuMDE5MkMxNi44NTE2IDYxLjA3NDMgMTYuMDc5MiA2MC4zMDcyIDE1LjEyNjUgNjAuMzA3MkMxNC4xNzM5IDYwLjMwNzIgMTMuNDAxNiA2MS4wNzQzIDEzLjQwMTYgNjIuMDE5MkMxMy40MDE2IDYyLjk2NTkgMTQuMTc0IDYzLjczMyAxNS4xMjY1IDYzLjczM0MxNi4wNzkyIDYzLjczMyAxNi44NTE2IDYyLjk2NTkgMTYuODUxNiA2Mi4wMTkyWk0yMC45OTMzIDYwLjMwNzJDMjEuOTQ2MiA2MC4zMDcyIDIyLjcxNzggNjEuMDc0MyAyMi43MTc4IDYyLjAxOTFDMjIuNzE3OCA2Mi45NjU5IDIxLjk0NjMgNjMuNzMyOSAyMC45OTMzIDYzLjczMjlDMjAuMDQwMyA2My43MzI5IDE5LjI2NzcgNjIuOTY1OSAxOS4yNjc4IDYyLjAxOTFDMTkuMjY3OCA2MS4wNzQzIDIwLjA0MDMgNjAuMzA3MiAyMC45OTMzIDYwLjMwNzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxwYXRoIG9wYWNpdHk9IjAuMSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4zMDM5IDcxLjcwNzdDMTUuMzAzOSA3MS43MDc3IDIxLjk5MjkgNzEuMTkwOCAyNC43ODg5IDY3LjYxMDZDMjEuOTkyOSA3MS41NDg4IDE5LjE5NjkgNzMuNjk2OSAxNi43NTAzIDc0LjQxM0MxNC4zMDM4IDc1LjEyOSAxNS4zMDM5IDcxLjcwNzcgMTUuMzAzOSA3MS43MDc3WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgo8L2c+CjxnIG9wYWNpdHk9IjAuOSIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjJfZCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjAwMjMgMTA0LjM3MUMxNi4wMDIzIDEwMy4xMDUgMTcuNTE4NiAxMDIuNDU1IDE4LjQzNTQgMTAzLjMyOEwyNC42MDY5IDEwOS4yMDVDMjUuODM0NyAxMTAuMzc1IDI1Ljc5MTggMTEyLjM0NiAyNC41MTQzIDExMy40NjFMMTguMzg5MSAxMTguODA2QzE3LjQ1NzYgMTE5LjYxOCAxNi4wMDIzIDExOC45NTcgMTYuMDAyMyAxMTcuNzIxVjExNS44MzNDMTYuMDAyMyAxMTUuODMzIDcuMjkyOTQgMTE0LjI2NCA0LjQ5OTE5IDExOS4zOTJDNC4yMzg3MiAxMTkuODcgMy4yMjM0NSAxMjAuMDM4IDMuNDI5ODIgMTE3LjY1MkM0LjI5MjgyIDExMy4yNjIgNi4wNTY1NCAxMDYuNDA4IDE2LjAwMjMgMTA2LjQwOFYxMDQuMzcxWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8cGF0aCBvcGFjaXR5PSIwLjAzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyLjAwNiAxMDYuNzU4TDIzLjI3NDEgMTA5LjI5NEMyMy43NjM4IDExMC4yNzMgMjMuNTI4NSAxMTEuNDYgMjIuNzAyMyAxMTIuMTc4TDE2LjA1NiAxMTcuOTU4QzE2LjA1NiAxMTcuOTU4IDE1LjcwNiAxMTkuNzA4IDE2Ljc1NiAxMTkuNzA4QzE3LjgwNiAxMTkuNzA4IDI2LjIwNiAxMTIuMDA4IDI2LjIwNiAxMTIuMDA4QzI2LjIwNiAxMTIuMDA4IDI2LjU1NiAxMTAuOTU4IDI1LjUwNiAxMDkuOTA4QzI0LjQ1NiAxMDguODU4IDIyLjAwNiAxMDYuNzU4IDIyLjAwNiAxMDYuNzU4WiIgZmlsbD0iIzE2MTgyMyIvPgo8cGF0aCBvcGFjaXR5PSIwLjA5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjAwMjMgMTA2Ljc4VjExNS44OEMxNi4wMDIzIDExNS44OCA3LjY2NzQ3IDExNC43MDYgNS4wNTcwNSAxMTguNjhDMi41NDUyNiAxMjIuNTA1IDIuNzc1OTUgMTE0LjM2MSA2LjU1NzI4IDExMC4zMDZDMTAuMzM4NiAxMDYuMjUxIDE2LjAwMjMgMTA2Ljc4IDE2LjAwMjMgMTA2Ljc4WiIgZmlsbD0idXJsKCNwYWludDFfcmFkaWFsKSIvPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwLjMwMzEyNSIgeT0iMi4zODI2NCIgd2lkdGg9IjI5LjMiIGhlaWdodD0iMjcuMjU4MyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSIxLjIiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMS4yIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZCIgeD0iMC42NTI3MzQiIHk9IjQ5Ljg1NzYiIHdpZHRoPSIyOC45NSIgaGVpZ2h0PSIyNy44NDc3IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEuMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMl9kIiB4PSIxLjAwMjM0IiB5PSIxMDEuNzI4IiB3aWR0aD0iMjYuODk4NCIgaGVpZ2h0PSIyMS41NTYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iMS4yIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuMiIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIxMi44NTk5IiB5MT0iNzAuOTMxOCIgeDI9IjEzLjk2NjkiIHkyPSI3NC40MTA2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9IjAuMDEiLz4KPC9saW5lYXJHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDFfcmFkaWFsIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjMwODIgMTIxLjc3Nikgcm90YXRlKC0xMTMuMDQ2KSBzY2FsZSgxMS4xMzkxIDEwLjk0OTgpIj4KPHN0b3AvPgo8c3RvcCBvZmZzZXQ9IjAuOTk1NDk2IiBzdG9wLW9wYWNpdHk9IjAuMDEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9IjAuMDEiLz4KPC9yYWRpYWxHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUzMTI1IDAuOTU3NjQyKSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAxIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC45NTMxMjUgNDguOTU3NikiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
                alt="Icon"
              />
            </div>
            <div className={cx('album')}>
              <Image src="" alt=""></Image>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('fyp-tab')}></div>
      <div className={cx('control-container')}>
        <div className={cx('control-operation')}>
          <div className={cx('play-infor')}>
            <div
              className={cx('icon', 'play-btn', { pause: playing })}
              onClick={handlePlayControl}
            ></div>
            {playedSeconds && (
              <div className={cx('play-time')}>
                {`${playedSeconds.hours}:${playedSeconds.minutes}:${playedSeconds.seconds}`}
                <span>/</span>
                {`${totalSeconds.hours}:${totalSeconds.minutes}:${totalSeconds.seconds}`}
              </div>
            )}
          </div>
          <div className={cx('player-operation')}>
            <div
              className={cx('icon', 'volume-icon', { muted })}
              onClick={handleVolume}
            ></div>
            <div
              className={cx('icon', 'fullscreen-icon')}
              onClick={handleFullScreen}
            ></div>
          </div>
        </div>
        <div className={cx('progess-bar-container')}>
          <div
            className={cx('progress-bar')}
            style={{ width: `${playedPct}%` }}
          ></div>
          <input
            type="range"
            min={0}
            max={100}
            value={playedPct}
            onInput={handleChangePlayedTime}
          />
        </div>
      </div>
      <div className={cx('change-video-btn')}>
        <div className={cx('file-name')}>
          <img
            alt="tick-icon"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ljk5OTM1IDAuNjY2NjI2QzUuOTc0NDkgMC42NjY2MjYgNC4xNDAyNCAxLjQ4ODE3IDIuODEzOSAyLjgxNDUxQzEuNDg3NTYgNC4xNDA4NSAwLjY2NjAxNiA1Ljk3NTEgMC42NjYwMTYgNy45OTk5NkMwLjY2NjAxNiAxMC4wMjQ4IDEuNDg3NTYgMTEuODU5MSAyLjgxMzkgMTMuMTg1NEM0LjE0MDI0IDE0LjUxMTggNS45NzQ0OSAxNS4zMzMzIDcuOTk5MzUgMTUuMzMzM0MxMC4wMjQyIDE1LjMzMzMgMTEuODU4NSAxNC41MTE4IDEzLjE4NDggMTMuMTg1NEMxNC41MTExIDExLjg1OTEgMTUuMzMyNyAxMC4wMjQ4IDE1LjMzMjcgNy45OTk5NkMxNS4zMzI3IDUuOTc1MSAxNC41MTExIDQuMTQwODUgMTMuMTg0OCAyLjgxNDUxQzExLjg1ODUgMS40ODgxNyAxMC4wMjQyIDAuNjY2NjI2IDcuOTk5MzUgMC42NjY2MjZaTTMuNzU2NzEgMy43NTczMkM0Ljg0MzIyIDIuNjcwOCA2LjM0MjMxIDEuOTk5OTYgNy45OTkzNSAxLjk5OTk2QzkuNjU2MzkgMS45OTk5NiAxMS4xNTU1IDIuNjcwOCAxMi4yNDIgMy43NTczMkMxMy4zMjg1IDQuODQzODMgMTMuOTk5MyA2LjM0MjkyIDEzLjk5OTMgNy45OTk5NkMxMy45OTkzIDkuNjU3IDEzLjMyODUgMTEuMTU2MSAxMi4yNDIgMTIuMjQyNkMxMS4xNTU1IDEzLjMyOTEgOS42NTYzOSAxNCA3Ljk5OTM1IDE0QzYuMzQyMzEgMTQgNC44NDMyMiAxMy4zMjkxIDMuNzU2NzEgMTIuMjQyNkMyLjY3MDE5IDExLjE1NjEgMS45OTkzNSA5LjY1NyAxLjk5OTM1IDcuOTk5OTZDMS45OTkzNSA2LjM0MjkyIDIuNjcwMTkgNC44NDM4MyAzLjc1NjcxIDMuNzU3MzJaTTEwLjk0ODQgNi43MTQ5NkMxMS4wMTYzIDYuNjQ2MTUgMTEuMDE2MyA2LjUzNDU5IDEwLjk0ODQgNi40NjU3OEwxMC4yMTAyIDUuNzE4MjNDMTAuMTQyMyA1LjY0OTQyIDEwLjAzMjEgNS42NDk0MiA5Ljk2NDE3IDUuNzE4MjNMNy4zMDM0IDguNDEyODJMNi4wMzQ1MyA3LjEyNzgyQzUuOTY2NTggNy4wNTkwMSA1Ljg1NjQyIDcuMDU5MDEgNS43ODg0NyA3LjEyNzgyTDUuMDUwMzEgNy44NzUzN0M0Ljk4MjM2IDcuOTQ0MTggNC45ODIzNiA4LjA1NTc0IDUuMDUwMzEgOC4xMjQ1NUw3LjE4MDM3IDEwLjI4MTdDNy4yNDgzMiAxMC4zNTA1IDcuMzU4NDggMTAuMzUwNSA3LjQyNjQzIDEwLjI4MTdMMTAuOTQ4NCA2LjcxNDk2WiIgZmlsbD0iIzE2MTgyMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+Cjwvc3ZnPgo="
          ></img>
          <p>{fileName}</p>
        </div>
        <button className={cx('change-btn')}>Change video</button>
      </div>
    </div>
  );
}

export default memo(MobilePreview);
