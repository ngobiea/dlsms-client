import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
const TutorSessionView = () => {
  const videoRef = useRef();
  const { activeBorder, localVideoStream } =
    useSelector((state) => {
      return state.session;
    });
  useEffect(() => {
    if (localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
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
        <StudentView />
        <div className="absolute bottom-0 right-0  h-60  w-72 bg-blue-900">
          <video
            autoPlay
            className=" h-64 bg-blue-900 max-w-full "
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
const StudentView = () => {
  const studentVideoRef = useRef();
  const studentAudioRef = useRef();
  const studentScreenRef = useRef();
  const { peers } = useSelector((state) => {
    return state.session;
  });
  useEffect(() => {
    if (peers[0]?.video) {
      studentVideoRef.current.srcObject = peers[0]?.video;
    }
  }, [peers[0]?.video]);
  useEffect(() => {
    if (peers[0]?.audio) {
      studentAudioRef.current.srcObject = peers[0]?.audio;
    }
  }, [peers[0]?.audio]);
  useEffect(() => {
    if (peers[0]?.screen) {
      studentScreenRef.current.srcObject = peers[0]?.screen;
    }
  }, [peers[0]?.screen]);
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full">
        <video
          autoPlay
          className="h-full w-fit object-cover bg-blue-900"
          ref={studentVideoRef}
          muted={true}
        ></video>
      </div>
      <audio autoPlay ref={studentAudioRef} className=" hidden"></audio>
      <div className="w-1/2 h-full">
        <video
          autoPlay
          className=" h-fit w-full bg-blue-900 object-cover "
          ref={studentScreenRef}
          muted={true}
        ></video>
      </div>
    </div>
  );
};

export default TutorSessionView;
