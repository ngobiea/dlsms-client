import React, { useRef, useEffect } from 'react';
import { MdVideocam, MdStopScreenShare, MdPeopleAlt } from 'react-icons/md';
import { BsArrowsAngleExpand, BsShieldCheck } from 'react-icons/bs';
import { HiSpeakerWave } from 'react-icons/hi2';

const SessionCard = ({ student }) => {
  console.log(student);
  console.log(student.video);
  const videoRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    console.log(student);

    if (student.video) {
      videoRef.current.srcObject = student.video;
      console.log(student);
    }
    if (student.screen) {
      screenRef.current.srcObject = student.screen;
    }
  }, [student.video, student.screen]);

  return (
    <div className="relative cursor-pointer">
      <video
        className="h-auto max-w-full block"
        autoPlay
        ref={videoRef}
      ></video>
      <div className="absolute top-0 cursor-pointer left-0 overflow-auto">
        <video autoPlay ref={screenRef} className="w-25 h-20" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-10 bg-gray-300 bg-opacity-50">
        <MdStopScreenShare className="self-center text-4xl text-red-600 my-1" />
        <MdPeopleAlt className="self-center my-1 text-4xl text-red-500 " />
        <BsShieldCheck className="self-center my-1 text-4xl text-green-500" />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-green-200 bg-opacity-50 w-full flex justify-between">
        <div className="">{`${student.firstName}@${student.studentId}`}</div>
        <div className="flex self-center">
          <HiSpeakerWave className="self-center mx-1" />
          <MdVideocam className="self-center mx-1" />
          <BsArrowsAngleExpand className="self-center mx-1" />
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
