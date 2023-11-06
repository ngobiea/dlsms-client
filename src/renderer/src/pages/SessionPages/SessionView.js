import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

const SessionView = () => {
  const videoRef = useRef();
  const shareScreenRef = useRef();
  const { activeBorder, localVideoStream, localScreenStream } = useSelector(
    (state) => {
      return state.session;
    }
  );

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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
          <div>
            <video
              className="h-auto bg-blue-900 max-w-full "
              ref={shareScreenRef}
              autoPlay
              muted
            ></video>
          </div>
        </div>

        <div className="absolute bottom-0 right-0  h-60  w-72 bg-blue-900">
          <video
            autoPlay
            className=" h-max-full bg-blue-900 max-w-full "
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

export default SessionView;
