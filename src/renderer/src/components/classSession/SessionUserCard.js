import React, { useRef, useEffect } from 'react';
import { MdVideocam } from 'react-icons/md';
import { HiSpeakerWave } from 'react-icons/hi2';
import userProfile from '../../../public/images/sessionProfile.jpg';

const SessionUserCard = ({ user }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (user.video) {
      videoRef.current.srcObject = user.video;
    }

    if (user.audio) {
      audioRef.current.srcObject = user.audio;
      audioRef.current.play();
    }
  }, [user.video, user.audio]);
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

      <audio autoPlay ref={audioRef} className=""></audio>

      <div className="absolute inset-x-0 bottom-0 bg-green-200 bg-opacity-50 w-full flex justify-between">
        <div className="">{`${user.firstName}`}</div>
        <div className="flex self-center">
          <HiSpeakerWave className="self-center mx-1" />
          <MdVideocam className="self-center mx-1" />
        </div>
      </div>
    </div>
  );
};

export default SessionUserCard;
