import React, { useRef, useEffect } from 'react';
import { MdVideocam } from 'react-icons/md';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import { HiSpeakerWave } from 'react-icons/hi2';
import userProfile from '../../../public/images/sessionProfile.jpg';

const SessionUserCard = ({ user }) => {
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (user.video) {
      videoRef.current.srcObject = user.video;
    }
    if (user.screen) {
      screenRef.current.srcObject = user.screen;
    }
  }, [user.video, user.screen]);
  console.log(user);
  return (
    <div
      className="relative cursor-pointer h-60 bg-contain"
      style={{
        backgroundImage: `url(${userProfile})`,
      }}
    >
      {user.video?.active && (
        <video
          className=" h-max max-w-full block"
          autoPlay
          ref={videoRef}
        ></video>
      )}

      {user.screen?.active && (
        <div className="absolute top-0 cursor-pointer left-0 overflow-auto">
          <video autoPlay ref={screenRef} className="w-25 h-20" />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-green-200 bg-opacity-50 w-full flex justify-between">
        <div className="">{`${user.firstName}@${user.userId}`}</div>
        <div className="flex self-center">
          <HiSpeakerWave className="self-center mx-1" />
          <MdVideocam className="self-center mx-1" />
          <BsArrowsAngleExpand className="self-center mx-1" />
        </div>
      </div>
    </div>
  );
};

export default SessionUserCard;
