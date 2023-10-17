import React, { useEffect, useRef } from 'react';
import { realTimeRecognition } from '../../utils/face/realtime';
import { useSelector } from 'react-redux';
let interval;
const ExamSessionView = () => {
  const videoRef = useRef(null);
  const shareScreenRef = useRef();

  const { activeBorder, localVideoStream, localScreenStream } = useSelector(
    (state) => {
      return state.session;
    }
  );
  interval = setInterval(async () => {
    await realTimeRecognition();
  }, 5000);
  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
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
              className="h-full w-fit bg-blue-900"
              ref={videoRef}
              muted={!!localVideoStream}
            ></video>
          </div>
          <div className="w-1/2 h-full object-cover  ">
            <video
              autoPlay
              className="h-full bg-blue-900 object-cover "
              ref={shareScreenRef}
              muted
            ></video>
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
