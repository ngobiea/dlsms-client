import React, { useEffect, useRef, useContext } from 'react';
import Toggle from 'react-toggle';
import { getDevices } from '../../utils/getDevices';
import TutorContext from '../../context/TutorContext';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setMicState,
  setVideoEnable,
  setDefaultAudioInputDevice,
  setDefaultAudioOutputDevice,
  setDefaultVideoOutputDevice,
  store,
} from '../../store';
import {
  setUpWebCam,
  disableWebCam,
  enableWebCam,
} from '../../utils/webcamSetup';
import {
  MdVideocam,
  MdVideocamOff,
  MdOutlineMic,
  MdOutlineMicOff,
} from 'react-icons/md';
import { socket } from '../../context/realtimeContext';

const handleVideo = (e) => {
  const value = e.target.checked;
  if (value) {
    enableWebCam(false, true);
  } else {
    disableWebCam();
  }
  store.dispatch(setVideoEnable(value));
};

const handleMic = (e) => {
  const value = e.target.checked;
  if (value) {
    store.dispatch(setMicState('enable'));
  } else {
    store.dispatch(setMicState('disable'));
  }
};

const TutorSetup = () => {
  const { tutor } = useContext(TutorContext);
  const videoRef = useRef();
  const navigate = useNavigate();

  const { isVideoEnable, localVideoStream, micState } = useSelector((state) => {
    return state.session;
  });

  useEffect(() => {
    getDevices();
    socket.emit(
      'oneToOneSession',
      { examSessionId: tutor.examSessionId, studentId: tutor.studentId },
      async ({ rtpCapabilities, student }) => {
        console.log(rtpCapabilities);
        tutor.loadDevice(rtpCapabilities, socket, student);
      }
    );
  }, []);

  useEffect(() => {
    if (localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
    }
  }, [localVideoStream]);

  const handleToClassSession = () => {
    navigate('/session');
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <div className="h-screen m-auto pt-28">
      <div className="flex justify-around">
        <p className="text-title  text-center">
          Choose you audio and video setting for
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col ml-48">
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
                  icons={false}
                  onChange={handleVideo}
                  checked={isVideoEnable}
                />
              </label>
            </div>
            <div className="flex">
              {micState === 'unmute' || micState === 'enable' ? (
                <MdOutlineMic className="w-10 h-6 self-center" />
              ) : (
                <MdOutlineMicOff className="w-10 h-6 self-center" />
              )}
              <label className="relative inline-flex items-center my-4 self-center  cursor-pointer">
                <Toggle
                  icons={false}
                  onChange={handleMic}
                  checked={micState === 'unmute' || micState === 'enable'}
                />
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
        <DeviceSelect />
      </div>
    </div>
  );
};

const DeviceSelect = () => {
  const dispatch = useDispatch();
  const {
    audioInputDevices,
    audioOutputDevices,
    videoOutputDevices,
    defaultAudioInputDevice,
    defaultAudioOutputDevice,
    defaultVideoOutputDevice,
  } = useSelector((state) => {
    return state.session;
  });

  const handleAudioInputChange = (event) => {
    dispatch(setDefaultAudioInputDevice(event.target.value));
  };

  const handleAudioOutputChange = (event) => {
    dispatch(setDefaultAudioOutputDevice(event.target.value));
  };

  const handleVideoChange = (event) => {
    dispatch(setDefaultVideoOutputDevice(event.target.value));
    setUpWebCam();
  };
  return (
    <div className="mr-48 flex flex-col justify-around">
      <div className="ml-20 relative">
        <label className="text-green-800 font-bold">Choose a microphone</label>
        <select
          value={defaultAudioInputDevice || ''}
          onChange={handleAudioInputChange}
          className="block py-2.5 px-0 w-96 text-sm text-green-800 bg-transparent border-0 border-b-2 border-green-500 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          {audioInputDevices.length > 0 &&
            audioInputDevices.map((source) => {
              return (
                <option key={source.deviceId} value={source.deviceId}>
                  {source.label}
                </option>
              );
            })}
        </select>
      </div>
      <div className="ml-20 relative">
        <label className="text-green-800 font-bold">Choose a Speaker</label>
        <select
          value={defaultAudioOutputDevice || ''}
          onChange={handleAudioOutputChange}
          className="block py-2.5 px-0 w-96 text-sm text-green-800 bg-transparent border-0 border-b-2 border-green-500 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          {audioOutputDevices.length > 0 &&
            audioOutputDevices.map((source) => {
              return (
                <option key={source.deviceId} value={source.deviceId}>
                  {source.label}
                </option>
              );
            })}
        </select>
      </div>
      <div className="ml-20 relative">
        <label className="text-green-800 font-bold">Choose a Camera</label>
        <select
          value={defaultVideoOutputDevice || ''}
          onChange={handleVideoChange}
          className="block py-2.5 px-0 w-96 text-sm text-green-800 bg-transparent border-0 border-b-2 border-green-500 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          {videoOutputDevices.length > 0 &&
            videoOutputDevices.map((source) => {
              return (
                <option key={source.deviceId} value={source.deviceId}>
                  {source.label}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default TutorSetup;
