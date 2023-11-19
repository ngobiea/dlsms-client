import React, { useEffect, useRef } from 'react';
import SessionUserCard from '../../components/classSession/SessionUserCard';
import { useSelector } from 'react-redux';
import FaceApi from '../../utils/face/FaceApi';
const SessionView = () => {
  const videoRef = useRef();
  const {
    activeBorder,
    localVideoStream,
    peers,
    isScreenShare,
  } = useSelector((state) => {
    return state.session;
  });

  useEffect(() => {
    if (localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
      FaceApi.processRealTimeRecognition(videoRef.current);
    }
  }, [localVideoStream]);

  const activeFullScreenClass = 'h-full relative w-full bg-green-800';
  const inActiveFullScreenClass = 'h-full relative w-4/5 bg-green-800';
  return (
    <div className=" pt-16 h-full bg-gray-400 overflow-hidden flex flex-wrap">
      <div
        className={
          activeBorder === 'chat' || activeBorder === 'participants'
            ? inActiveFullScreenClass
            : activeFullScreenClass
        }
      >
        {isScreenShare ? (
          <ScreenShareView />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
            {peers.map((peer) => {
              return <SessionUserCard key={peer._id.toString()} user={peer} />;
            })}
          </div>
        )}

        {peers.map((peer) => {
          return <AudioView key={peer._id.toString()} peer={peer} />;
        })}

        <div className="absolute bottom-0 right-0 h-60 w-64 bg-blue-900">
          <video
            autoPlay
            className=" h-full w-full bg-blue-900 object-cover"
            ref={videoRef}
          ></video>
        </div>
      </div>
      {activeBorder === 'chat' ? (
        <div className="p-2 w-1/5 h-full overflow-hidden bg-red-400"></div>
      ) : (
        ''
      )}
      {activeBorder === 'participants' ? (
        <div className="p-2 w-1/5 h-full overflow-hidden bg-white text-green-800">
          <h2 className="font-bold text-xl">Participants</h2>
          <div className="pt-10">
            <p>In this Meeting (1)</p>
            <div className="h-full overflow-y-scroll">
              <p>Augustine Foday Ngobie</p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const ScreenShareView = () => {
  const screenRef = useRef();
  const videoRef1 = useRef();
  const videoRef2 = useRef();
  const { peers, screenShareStream } = useSelector((state) => {
    return state.session;
  });
  useEffect(() => {
    if (screenShareStream) {
      screenRef.current.srcObject = screenShareStream;
    }
  }, [screenShareStream]);

  useEffect(() => {
    if (peers.length > 0 && peers[0].video) {
      videoRef1.current.srcObject = peers[0].video;
    }
    if (peers.length > 1 && peers[1].video) {
      videoRef2.current.srcObject = peers[1].video;
    }
  }, [peers]);
  return (
    <div className=" w-full h-full bg-white flex">
      <div className=" w-10/12 h-full bg-yellow-200">
        <video
          autoPlay
          ref={screenRef}
          className=" w-full h-full object-cover"
        ></video>
      </div>
      <div className=" w-2/12 h-3/4 bg-red-400 flex flex-col">
        <div className="h-60 w-full bg-sidebarHover">
          <video
            ref={videoRef1}
            autoPlay
            className="h-full w-full object-cover"
          ></video>
        </div>
        <div className="h-60 w-full bg-purple-600">
          <video
            ref={videoRef2}
            autoPlay
            className="h-full w-full object-cover"
          ></video>
        </div>
      </div>
    </div>
  );
};
const AudioView = (peer) => {
  const audioRef = useRef();
  useEffect(() => {
    if (peer.audio) {
      audioRef.current.srcObject = peer.audio;
      audioRef.current.play();
    }
  }, [peer.audio]);

  return <audio autoPlay ref={audioRef} className=" hidden" />;
};
export default SessionView;
