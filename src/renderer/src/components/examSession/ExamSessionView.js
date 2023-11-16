import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import FaceApi from '../../utils/face/FaceApi';
import profile from '../../../public/images/sessionProfile.jpg';
const ExamSessionView = () => {
  const videoRef = useRef();
  const tutorVideoRef = useRef();
  const tutorAudioRef = useRef();
  const shareScreenRef = useRef();

  const { activeBorder, localVideoStream, localScreenStream, peers } =
    useSelector((state) => {
      return state.session;
    });

  useEffect(() => {
    console.log(peers[0]);
    if (peers[0]?.video) {
      tutorVideoRef.current.srcObject = peers[0].video;
    }
    if (peers[0]?.audio) {
      tutorAudioRef.current.srcObject = peers[0].audio;
      tutorAudioRef.current.play();
    }
  }, [peers[0]?.video, peers[0]?.audio, peers[0]?.screen]);

  useEffect(() => {
    if (localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
      FaceApi.processRealTimeRecognition(videoRef.current);
    }
  }, [localVideoStream]);

  useEffect(() => {
    if (localScreenStream) {
      shareScreenRef.current.srcObject = localScreenStream;
    }
  }, [localScreenStream]);

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
        <div className="flex w-full h-full">
          <div className="w-1/2 h-full">
            <video
              autoPlay
              className="h-full w-fit object-cover bg-blue-900"
              ref={videoRef}
              muted={true}
            ></video>
          </div>
          <div className="w-1/2 h-full">
            <div className="h-1/2 w-full">
              <video
                autoPlay
                className=" h-full w-full bg-blue-900  "
                ref={shareScreenRef}
                muted
              ></video>
            </div>
            <div className=" h-1/2 w-full">
              {peers[0]?.video ? (
                <video
                  autoPlay
                  className="h-full w-full bg-blue-900 object-cover "
                  muted={true}
                  ref={tutorVideoRef}
                ></video>
              ) : (
                <img src={profile} className="h-full w-full"></img>
              )}
              <audio autoPlay ref={tutorAudioRef} className=""></audio>
            </div>
          </div>
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

export default ExamSessionView;
