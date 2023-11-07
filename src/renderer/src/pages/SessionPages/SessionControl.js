import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PiPhoneDisconnectFill, PiRecordFill } from 'react-icons/pi';
import { ipcRenderer } from 'electron';
import classSessionContext from '../../context/ClassSessionContext';
import { shareScreen, stopShareScreen } from '../../utils/screen';
import {
  MdOutlineChat,
  MdPeopleOutline,
  MdVideocam,
  MdVideocamOff,
  MdOutlineMic,
  MdOutlineMicOff,
  MdScreenShare,
  MdStopScreenShare,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import {
  setIsShareScreen,
  setIsShowParticipants,
  setIsShowChat,
  setIsRecording,
  store,
} from '../../store';
import {
  disableWebCam,
  enableWebCam,
  enableMic,
  muteMic,
  unmuteMic,
} from '../../utils/webcamSetup';

ipcRenderer.on('source', (_e, { source }) => {
  console.log('source', source);
  // store.dispatch(setScreenId(source.id));
  store.dispatch(setIsShareScreen(true));
  shareScreen(source.id);
});

const SessionControl = () => {
  const { classSession } = useContext(classSessionContext);
  const dispatch = useDispatch();
  const {
    micState,
    isVideoEnable,
    isScreenEnable,
    isShowChat,
    isShowParticipants,
    isRecording,
    activeBorder,
    localVideoStream,
    localScreenStream,
  } = useSelector((state) => {
    return state.session;
  });

  useEffect(() => {
    if (localVideoStream) {
      classSession.produceVideo();
    }
  }, [localVideoStream]);
  useEffect(() => {
    if (localScreenStream) {
      classSession.produceScreen();
    }
  }, [localScreenStream]);

  useEffect(() => {
    if (micState === 'enable') {
      enableMic()
        .then((stream) => {
          classSession.produceAudio(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleRecoding = () => {
    if (isRecording) {
      dispatch(setIsRecording(false));
    } else {
      dispatch(setIsRecording(true));
    }
  };
  const handleShowChat = () => {
    if (isShowChat) {
      dispatch(setIsShowChat(false));
    } else {
      dispatch(setIsShowChat(true));
    }
  };
  const handleShowParticipants = () => {
    if (isShowParticipants) {
      dispatch(setIsShowParticipants(false));
    } else {
      dispatch(setIsShowParticipants(true));
    }
  };
  const handleVideo = () => {
    if (isVideoEnable) {
      disableWebCam();
      classSession.closeProducer('video');
    } else {
      enableWebCam();
    }
  };
  const handleMic = () => {
    console.log('micState ', micState);
    if (micState === 'disable') {
      enableMic().then((stream) => {
        classSession.produceAudio(stream);
      });
      classSession.produceAudio();
    } else if (micState === 'mute') {
      classSession.resumeAudioProducer();
      unmuteMic();
    } else if (micState === 'unmute' || micState === 'enable') {
      classSession.pauseAudioProducer();
      muteMic();
    }
  };
  const handleShareScreen = () => {
    if (isScreenEnable) {
      stopShareScreen();
      dispatch(setIsShareScreen(false));
    } else {
      ipcRenderer.send('showScreenSources');
    }
  };
  const handleLeaveSession = () => {
    window.account.closeSessionWindow('closeSessionWindow');

    ipcRenderer.send('closeSessionWindow');
  };
  const handleEndSession = () => {
    window.account.closeSessionWindow('closeSessionWindow');
    ipcRenderer.send('closeSessionWindow');
  };
  const activeBorderClass =
    'flex flex-col px-2 mx-2 text-green-800 cursor-pointer hover:text-green-500 hover:border-green-500 border-b-2 border-green-800';
  const inActiveBorderClass =
    'flex flex-col px-2 mx-2  text-green-800 cursor-pointer hover:text-green-500 border-green-800';
  return (
    <div className="absolute flex justify-between h-16 bg-gray-300 w-full">
      <div className=" self-center flex pl-5">
        {isRecording ? (
          <PiRecordFill className="self-center text-red-600 pt-1 w-6 h-6" />
        ) : (
          '   '
        )}
        <div className="self-center align-middle text-center">{'--:--'}</div>
      </div>
      <div className="self-center pr-3 flex">
        <div className="border-r-2 flex border-green-800">
          <div
            onClick={() => {
              handleRecoding();
            }}
            className="flex flex-col px-2 mx-2 text-green-800 cursor-pointer hover:text-green-500"
          >
            <PiRecordFill className="self-center  pt-1 w-6 h-6" />
            <p>Record</p>
          </div>
          <div
            onClick={handleShowChat}
            className={
              activeBorder === 'chat' || isShowChat
                ? activeBorderClass
                : inActiveBorderClass
            }
          >
            <MdOutlineChat className="self-center pt-1 w-6 h-6" />
            <p>Chat</p>
          </div>
          <div
            onClick={handleShowParticipants}
            className={
              activeBorder === 'participants' || isShowParticipants
                ? activeBorderClass
                : inActiveBorderClass
            }
          >
            <MdPeopleOutline className="self-center pt-1 w-6 h-6" />
            <p>Participants</p>
          </div>
        </div>
        <div className="flex">
          <div
            onClick={handleVideo}
            className="flex flex-col px-2 mx-2 text-green-600 cursor-pointer hover:text-green-500"
          >
            {isVideoEnable ? (
              <MdVideocam className="self-center pt-1 w-6 h-6" />
            ) : (
              <MdVideocamOff className="self-center pt-1 w-6 h-6" />
            )}
            <p>Camera</p>
          </div>
          <div
            onClick={handleMic}
            className="flex flex-col px-2 mx-2 text-green-600 cursor-pointer hover:text-green-500"
          >
            {micState === 'unmute' || micState === 'enable' ? (
              <MdOutlineMic className="self-center pt-1 w-6 h-6" />
            ) : (
              <MdOutlineMicOff className="self-center pt-1 w-6 h-6" />
            )}
            <p>Mic</p>
          </div>
          <div
            onClick={handleShareScreen}
            className="flex flex-col px-2 mx-2 text-green-600 cursor-pointer hover:text-green-500"
          >
            {isScreenEnable ? (
              <MdScreenShare className="self-center pt-1 w-6 h-6" />
            ) : (
              <MdStopScreenShare className="self-center pt-1 w-6 h-6" />
            )}
            <p>Share</p>
          </div>
          <button
            onClick={handleLeaveSession}
            className="py-2.5 px-3 cursor-pointer mb-2 flex text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg rounded-tr-none rounded-br-none  border-gray-200 hover:bg-red-700 hover:text-white"
          >
            <PiPhoneDisconnectFill className="self-center pr-1 w-6 h-6" />
            Leave
          </button>
          <button
            onClick={handleEndSession}
            className="py-2.5 px-1 cursor-pointer mb-2 flex text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg rounded-tl-none rounded-bl-none border-l border-gray-200 hover:bg-red-700 hover:text-white"
          >
            <MdOutlineKeyboardArrowDown className="w-6 h-6 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionControl;
