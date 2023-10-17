import React, { useEffect, useRef, useContext } from 'react';
import { ipcRenderer } from 'electron';
import Toggle from 'react-toggle';
import { getDevices } from '../../utils/getDevices';
import {
  setUpWebCam,
  disableWebCam,
  enableWebCam,
} from '../../utils/webcamSetup';
import { loadModels } from '../../utils/face/realtime';
import ExamSessionContext from '../../context/ExamSessionContext';
import { shareScreen, stopShareScreen } from '../../utils/screen';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setDefaultAudioInputDevice,
  setDefaultAudioOutputDevice,
  setDefaultVideoOutputDevice,
  setMicState,
} from '../../store';
import {
  MdVideocam,
  MdVideocamOff,
  MdOutlineMic,
  MdOutlineMicOff,
  MdScreenShare,
  MdStopScreenShare,
} from 'react-icons/md';
import { socket } from '../../context/realtimeContext';
const examSessionId = localStorage.getItem('examSessionId');

const ExamSessionSetup = () => {
  const { examSession } = useContext(ExamSessionContext);

  const videoRef = useRef();
  const screenRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isMicEnable,
    isVideoEnable,
    audioInputDevices,
    audioOutputDevices,
    videoOutputDevices,
    localVideoStream,
    defaultAudioInputDevice,
    defaultAudioOutputDevice,
    defaultVideoOutputDevice,
    micState,
    isScreenEnable,
    localScreenStream,
    screenId,
  } = useSelector((state) => {
    return state.session;
  });

  const handleToClassSession = () => {
    navigate('/examSession' );
    ipcRenderer.send('openExamQuestionWindow');
  };
  const handleMic = (e) => {
    const value = e.target.checked;
    if (value) {
      dispatch(setMicState('enable'));
    } else {
      dispatch(setMicState('disable'));
    }
  };
  const handleCancel = () => {
    ipcRenderer.send('closeExamS');
  };

  useEffect(() => {
    socket.emit(
      'newExamSession',
      { examSessionId },
      async ({ rtpCapabilities }) => {
        await examSession.loadDevice(rtpCapabilities, socket);
      }
    );
    ipcRenderer.send('showScreenSources');
  }, []);


  useEffect(() => {
    loadModels();
    getDevices();
  }, []);
  useEffect(() => {
    if (localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
    }
  }, [localVideoStream]);

  useEffect(() => {
    if (localScreenStream) {
      screenRef.current.srcObject = localScreenStream;
    }
  }, [localScreenStream]);
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

  const handleVideo = (e) => {
    const value = e.target.checked;
    if (value) {
      enableWebCam();
    } else {
      disableWebCam();
    }
  };
  const handleShareScreen = () => {
    if (isScreenEnable) {
      stopShareScreen();
    } else {
      shareScreen(screenId);
    }
  };

  const joinEnableStyle =
    'py-2.5 px-5 mr-2 w-20  text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-green-200 hover:bg-green-600 hover:text-white focus:z-10';
  const joinDisableStyle =
    'py-2.5 px-5 mr-2 w-20  text-sm font-medium text-white focus:outline-none bg-gray-400 rounded-lg border border-gray-200';
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
          <div className=" bg-black w-webcam h-96 relative">
            <video
              autoPlay
              ref={videoRef}
              className="w-full object-cover h-96"
            ></video>
            {localScreenStream && (
              <video
                autoPlay
                ref={screenRef}
                className=" w-48 h-48 object-cover absolute top-0 left-0"
              ></video>
            )}
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
              {isMicEnable ? (
                <MdOutlineMic className="w-10 h-6 self-center" />
              ) : (
                <MdOutlineMicOff className="w-10 h-6 self-center" />
              )}
              <label className="relative inline-flex items-center my-4 self-center  cursor-pointer">
                <Toggle
                  icons={false}
                  onChange={handleMic}
                  checked={micState === 'enable'}
                />
              </label>
            </div>
            <div className="flex">
              {isScreenEnable ? (
                <MdScreenShare className="w-10 h-6 self-center" />
              ) : (
                <MdStopScreenShare className="w-10 h-6 self-center" />
              )}
              <label className="relative inline-flex items-center my-4 self-center  cursor-pointer">
                <Toggle
                  icons={false}
                  onChange={handleShareScreen}
                  checked={isScreenEnable}
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
                disabled={
                  !(micState === 'enable' && isVideoEnable && isScreenEnable)
                }
                type="button"
                onClick={handleToClassSession}
                className={
                  micState === 'enable' && isVideoEnable && isScreenEnable
                    ? joinEnableStyle
                    : joinDisableStyle
                }
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mr-48 flex flex-col justify-around">
          <div className="ml-20 relative">
            <label className="text-green-800 font-bold">
              Choose a microphone
            </label>
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
      </div>
    </div>
  );
};

export default ExamSessionSetup;
