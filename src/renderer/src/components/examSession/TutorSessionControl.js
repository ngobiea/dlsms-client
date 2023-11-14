import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import { ipcRenderer } from 'electron';
import TutorContext from '../../context/TutorContext';
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
import { setIsShowParticipants, setIsShowChat } from '../../store';
import {
  disableWebCam,
  enableWebCam,
  enableMic,
  muteMic,
  unmuteMic,
} from '../../utils/webcamSetup';

const TutorSessionControl = () => {
  const { tutor } = useContext(TutorContext);

  const {
    isVideoEnable,
    isScreenEnable,
    localVideoStream,
    localScreenStream,
    micState,
    screenId,
  } = useSelector((state) => {
    return state.session;
  });
  useEffect(() => {
    if (localVideoStream) {
      tutor.produceVideo();
    }
  }, [localVideoStream]);

  useEffect(() => {
    if (localScreenStream) {
      tutor.produceScreen(isScreenEnable);
    }
  }, [localScreenStream]);
  useEffect(() => {
    if (micState === 'enable') {
      enableMic()
        .then((stream) => {
          tutor.produceAudio(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleVideo = () => {
    if (isVideoEnable) {
      disableWebCam();
      tutor.closeESProducer('video');
    } else {
      enableWebCam();
    }
  };

  const handleMic = () => {
    if (micState === 'disable') {
      enableMic()
        .then((stream) => {
          tutor.produceAudio(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (micState === 'mute') {
      tutor.resumeAudioProducer();
      unmuteMic();
    } else if (micState === 'unmute') {
      tutor.pauseAudioProducer();
      muteMic();
    }
  };

  const handleShareScreen = () => {
    if (isScreenEnable) {
      stopShareScreen();
      tutor.closeESProducer('screen');
    } else {
      shareScreen(screenId);
    }
  };

  const handleLeaveSession = () => {
    window.account.closeSessionWindow('closeSessionWindow');
    ipcRenderer.send('closeExamSessionWindow');
  };

  const handleEndSession = () => {
    window.account.closeSessionWindow('closeSessionWindow');
    ipcRenderer.send('closeSessionWindow');
  };

  return (
    <div className="absolute top-10 flex justify-between h-16 bg-gray-300 w-full">
      <div className=" self-center flex pl-5">
        <div className="self-center align-middle text-center">{'--:--'}</div>
      </div>
      <SessionControl
        handleEndSession={handleEndSession}
        handleLeaveSession={handleLeaveSession}
        handleVideo={handleVideo}
        handleMic={handleMic}
        handleShareScreen={handleShareScreen}
      />
    </div>
  );
};

const SessionControl = ({
  handleVideo,
  handleMic,
  handleShareScreen,
  handleLeaveSession,
  handleEndSession,
}) => {
  const { isVideoEnable, isScreenEnable, micState } = useSelector((state) => {
    return state.session;
  });

  return (
    <div className="self-center pr-3 flex">
      <ChatControl />
      <div className="flex">
        <button
          onClick={handleVideo}
          className="flex flex-col px-2 mx-2 text-green-600 cursor-pointer hover:text-green-500"
        >
          {isVideoEnable ? (
            <MdVideocam className="self-center pt-1 w-6 h-6" />
          ) : (
            <MdVideocamOff className="self-center pt-1 w-6 h-6" />
          )}
          <p>Camera</p>
        </button>
        <button
          onClick={handleMic}
          className="flex flex-col px-2 mx-2 text-green-600 cursor-pointer hover:text-green-500"
        >
          {micState === 'enable' || micState === 'unmute' ? (
            <MdOutlineMic className="self-center pt-1 w-6 h-6" />
          ) : (
            <MdOutlineMicOff className="self-center pt-1 w-6 h-6" />
          )}
          <p>Mic</p>
        </button>
        <button
          onClick={handleShareScreen}
          className="flex flex-col px-2 mx-2 text-green-600 cursor-pointer hover:text-green-500"
        >
          {isScreenEnable ? (
            <MdScreenShare className="self-center pt-1 w-6 h-6" />
          ) : (
            <MdStopScreenShare className="self-center pt-1 w-6 h-6" />
          )}
          <p>Share</p>
        </button>
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
  );
};
const ChatControl = () => {
  const dispatch = useDispatch();
  const { isShowChat, isShowParticipants, activeBorder } = useSelector(
    (state) => {
      return state.session;
    }
  );
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
  const activeBorderClass =
    'flex flex-col px-2 mx-2 text-green-800 cursor-pointer hover:text-green-500 hover:border-green-500 border-b-2 border-green-800';
  const inActiveBorderClass =
    'flex flex-col px-2 mx-2  text-green-800 cursor-pointer hover:text-green-500 border-green-800';
  return (
    <div className="border-r-2 flex border-green-800">
      <button
        onClick={handleShowChat}
        className={
          activeBorder === 'chat' || isShowChat
            ? activeBorderClass
            : inActiveBorderClass
        }
      >
        <MdOutlineChat className="self-center pt-1 w-6 h-6" />
        <p>Chat</p>
      </button>
      <button
        onClick={handleShowParticipants}
        className={
          activeBorder === 'participants' || isShowParticipants
            ? activeBorderClass
            : inActiveBorderClass
        }
      >
        <MdPeopleOutline className="self-center pt-1 w-6 h-6" />
        <p>Participants</p>
      </button>
    </div>
  );
};

export default TutorSessionControl;
