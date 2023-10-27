import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import { ipcRenderer } from 'electron';
import ExamSessionContext from '../../context/ExamSessionContext';
import { shareScreen, stopShareScreen } from '../../utils/screen';
const examSessionId = localStorage.getItem('examSessionId');

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
import { socket } from '../../context/realtimeContext';

const ExamSessionControl = () => {
  const dispatch = useDispatch();
  const { examSession } = useContext(ExamSessionContext);

  const {
    isVideoEnable,
    isScreenEnable,
    isShowChat,
    isShowParticipants,
    localVideoStream,
    localScreenStream,
    micState,
    screenId,
  } = useSelector((state) => {
    return state.session;
  });
  useEffect(() => {
    if (localVideoStream) {
      examSession.produceVideo();
    }
  }, [localVideoStream]);

  useEffect(() => {
    if (localScreenStream) {
      examSession.produceScreen(isScreenEnable);
    }
  }, [localScreenStream]);
  useEffect(() => {
    if (micState === 'enable') {
      enableMic()
        .then((stream) => {
          examSession.produceAudio(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'dVideo',
          title: 'Webcam Disabled',
          description: 'Student disabled webCam',
          time: new Date(),
        },
      });
      examSession.closeESProducer('video');
    } else {
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'video',
          title: 'Webcam Enabled',
          description: 'Student enabled webCam',
          time: new Date(),
        },
      });
      enableWebCam();
    }
  };

  const handleMic = () => {
    if (micState === 'disable') {
      enableMic()
        .then((stream) => {
          examSession.produceAudio(stream);
          socket.emit('violation', {
            examSessionId,
            violation: {
              type: 'mic',
              title: 'Mic Enabled',
              description: 'Student enabled mic',
              time: new Date(),
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (micState === 'mute') {
      unmuteMic();
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'mic',
          title: 'Mic Enabled',
          description: 'Student enabled mic',
          time: new Date(),
        },
      });
    } else if (micState === 'unmute') {
      muteMic();
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'mic',
          title: 'Mic Disabled',
          description: 'Student disabled mic',
          time: new Date(),
        },
      });
    }
  };
  const handleShareScreen = () => {
    if (isScreenEnable) {
      stopShareScreen();
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'screen',
          title: 'Screen Disabled',
          description: 'Student disabled screen',
          time: new Date(),
        },
      });
      examSession.closeESProducer('screen');
    } else {
      shareScreen(screenId);
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'screen',
          title: 'Screen Enabled',
          description: 'Student enabled screen',
          time: new Date(),
        },
      });
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
        handleShowChat={handleShowChat}
        handleShowParticipants={handleShowParticipants}
        handleVideo={handleVideo}
        handleMic={handleMic}
        handleShareScreen={handleShareScreen}
      />
    </div>
  );
};

const SessionControl = ({
  handleEndSession,
  handleLeaveSession,
  handleShowChat,
  handleShowParticipants,
  handleVideo,
  handleMic,
  handleShareScreen,
}) => {
  const {
    isVideoEnable,
    isScreenEnable,
    isShowChat,
    isShowParticipants,
    activeBorder,
    micState,
  } = useSelector((state) => {
    return state.session;
  });
  const activeBorderClass =
    'flex flex-col px-2 mx-2 text-green-800 cursor-pointer hover:text-green-500 hover:border-green-500 border-b-2 border-green-800';
  const inActiveBorderClass =
    'flex flex-col px-2 mx-2  text-green-800 cursor-pointer hover:text-green-500 border-green-800';
  return (
    <>
      <div className="self-center pr-3 flex">
        <div className="border-r-2 flex border-green-800">
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
            {micState === 'enable' || micState === 'unmute' ? (
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
    </>
  );
};

export default ExamSessionControl;
