import React, { useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import Toggle from 'react-toggle';
import { setMicEnable, setVideoEnable } from '../../store';
import {
  MdVideocam,
  MdVideocamOff,
  MdOutlineMic,
  MdOutlineMicOff,
} from 'react-icons/md';
import RealtimeContext from '../../context/realtimeContext';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ClassSessionSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    setUpWebCam,
    videoRef,
    disableWebcam,
    socket,
    createDevice,
  } = useContext(RealtimeContext);

  const { isMicEnable, isVideoEnable } = useSelector((state) => {
    return state.session;
  });

  const handleVideo = (e) => {
    const value = e.target.checked;
    if (value) {
      setUpWebCam(value, false);
    } else {
      disableWebcam();
    }
    dispatch(setVideoEnable(value));
  };
  const handleToClassSession = () => {
    navigate('/' + session);
  };
  const handleMic = (e) => {
    const value = e.target.checked;
    dispatch(setMicEnable(value));
  };
  const handleCancel = () => {
    ipcRenderer.send('closeSessionWindow');
  };
  const session = localStorage.getItem('sessionId');

  const joinClassSession = (sessionId) => {
    console.log('sessionId:', sessionId);
    socket.emit('join-class-session', { sessionId }, ({ rtpCapabilities }) => {
      createDevice(rtpCapabilities);
    });
  };

  useEffect(() => {
    if (socket) {
      joinClassSession(session);
      console.log('socket is set');
    }
  }, [socket]);

  return (
    <div className="h-screen m-auto w-webcam pt-28">
      <p className="text-title  text-center">
        Choose you audio and video setting for
      </p>
      <p className="px-10 py-2 my-3 font-bold text-lg text-center bg-gray-300  text-title rounded">
        First classroom className session
      </p>
      <div className="bg-gray-300 w-webcam h-96">
        <video
          autoPlay
          ref={videoRef}
          className="w-full object-cover h-96"
        ></video>
      </div>
      <div className="flex justify-between h-14 border-2 rounded border-green-800">
        <div className="flex">
          {isVideoEnable ? (
            <MdVideocam className="w-10 h-6 self-center" />
          ) : (
            <MdVideocamOff className="w-10 h-6 self-center" />
          )}
          <label className="relative inline-flex items-center my-4 self-center  cursor-pointer">
            <Toggle
              defaultChecked={false}
              icons={false}
              onChange={handleVideo}
            />
          </label>
        </div>
        <div className="flex">
          {isMicEnable ? (
            <MdOutlineMic className="w-10 h-6 self-center" />
          ) : (
            <MdOutlineMicOff className="w-10 h-6 self-center" />
          )}
          <label className="relative inline-flex items-center my-4 self-center  cursor-pointer">
            <Toggle defaultChecked={false} icons={false} onChange={handleMic} />
          </label>
        </div>
        <div className="self-center">
          <button
            onClick={handleCancel}
            type="button"
            className="py-2.5 px-5 mr-2 w-20 text-sm font-medium text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleToClassSession}
            className="py-2.5 px-5 mr-2 w-20  text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-green-200 hover:bg-green-600 hover:text-white focus:z-10"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassSessionSetup;
