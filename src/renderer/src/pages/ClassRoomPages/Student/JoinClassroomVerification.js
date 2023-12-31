import React, { useEffect, useRef } from 'react';
import {
  MdOutlineVerifiedUser,
  MdVideocam,
  MdVideocamOff,
  MdRefresh,
  MdOutlineArrowRightAlt,
} from 'react-icons/md';
import Toggle from 'react-toggle';
import { statusCode } from '../../../utils/statusCodes';
import {
  usePostJoinClassroomMutation,
  setDefaultWebcam,
  resetJoin,
} from '../../../store';
import { loadModels, capturePhotos } from '../../../utils/face/detection';
import { getWebCams, onWebCam, offWebCam } from '../../../utils/face/webcam';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';

const JoinClassroomVerification = () => {
  const zero = 0;

  const params = useParams();
  const navigate = useNavigate();
  const { classroomId } = params;
  const dispatch = useDispatch();
  const [postJoinClassroom, { isSuccess, data, error, isError }] =
    usePostJoinClassroomMutation();

  const {
    webcams,
    defaultWebcam,
    localStream,
    progress,
    result,
    buttonText,
    detectionThreshold,
    captureImages,
  } = useSelector((state) => state.join);
  useEffect(() => {
    getWebCams();
    loadModels();
    return () => {
      offWebCam();
      dispatch(resetJoin());
    };
  }, []);

  useEffect(() => {
    videoRef.current.srcObject = localStream;
  }, [localStream]);

  let resultComponents = (
    <div className="bg-green-900  p-8 text-md font-semibold text-white uppercase mt-8 text-center"></div>
  );
  if (result >= detectionThreshold) {
    resultComponents = (
      <div className="bg-green-600 hover:bg-green-700 p-8 text-md font-semibold text-white uppercase mt-8 text-center">
        <p>Verification passed</p>
      </div>
    );
  } else if (result >= zero && result < detectionThreshold) {
    resultComponents = (
      <div className="bg-red-500 hover:bg-red-700 p-8 text-md font-semibold text-white uppercase mt-8 text-center">
        <p>Verification Fail</p>
      </div>
    );
  }
  const videoRef = useRef();

  const handleVideoChange = (event) => {
    dispatch(setDefaultWebcam(event.target.value));
    onWebCam();
  };

  const handleWebcam = (e) => {
    const value = e.target.checked;
    if (value) {
      onWebCam();
    } else {
      offWebCam();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      const notification = new window.Notification(
        `Successfully joined ${data.classroom.name}`,
        {
          body: `Welcome to ${data.classroom.name}`,
        }
      );
      notification.onclick = () => {
        console.log('first');
      };
      navigate(`../../${classroomId}`);
    }

    if (isError) {
      console.log(error);
      if (error.status === statusCode.CONFLICT) {
        navigate(`/`);
      }
    }
  }, [isSuccess, isError]);
  const handleJoinClassroom = () => {
    const formData = new FormData();
    formData.append('classroomId', classroomId);
    console.log(captureImages);
    captureImages.forEach((image) => {
      formData.append('files', image);
    });

    postJoinClassroom(formData);
  };

  const activeClass =
    'text-white flex-col bg-[#06603a] hover:bg-[#3fa97b]/90  focus:outline-none  font-medium rounded-lg text-center inline-flex items-center w-32';
  const inactiveClass =
    'text-white flex-col bg-gray-400   focus:outline-none  font-medium rounded-lg text-center inline-flex items-center w-32';

  return (
    <div className="h-screen pt-10 ml-20 overflow-y-hidden">
      <p className="text-3xl font-bold text-center p-5">Image Verification</p>
      <div className="h-full flex justify-center">
        <div className="bg-gray-800 w-2/5 h-3/4 relative">
          <div className=" w-full h-5/6">
            <video
              ref={videoRef}
              autoPlay
              muted
              className=" h-full w-full object-cover"
            />
          </div>

          <div className="flex justify-around w-full h-1/6 bg-gray-200 p-3  text-gray-800">
            <div className="flex">
              {localStream ? (
                <MdVideocam className="w-20 h-10 self-center text-green-800" />
              ) : (
                <MdVideocamOff className="w-20 h-10 self-center text-green-800" />
              )}
              <label className="relative inline-flex items-center my-4 self-center  cursor-pointer">
                <Toggle
                  icons={false}
                  onChange={handleWebcam}
                  checked={localStream !== null}
                />
              </label>
            </div>
            <button
              onClick={capturePhotos}
              type="button"
              disabled={!localStream}
              className={localStream ? activeClass : inactiveClass}
            >
              {buttonText === 'verify' ? (
                <MdOutlineVerifiedUser className="w-10 h-12" />
              ) : (
                <MdRefresh className="w-10 h-12" />
              )}
              {buttonText}
            </button>
          </div>
        </div>
        <div className="bg-gray-100 w-2/5 h-3/4 relative">
          <div className="pl-20 pt-5 relative">
            <label className="text-green-800 font-bold">Choose a Camera</label>
            <select
              value={defaultWebcam || ''}
              onChange={handleVideoChange}
              className="block py-2.5 px-0 w-96 text-sm text-green-800 bg-transparent border-0 border-b-2 border-green-500 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              {webcams.length > 0 &&
                webcams.map((source) => {
                  return (
                    <option key={source.deviceId} value={source.deviceId}>
                      {source.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="w-full pt-20 ">
            <div className="bg-green-900 text-white rounded-b md:rounded-b-none md:rounded-r shadow-lg overflow-hidden">
              <div className="text-lg font-medium uppercase p-8 text-center border-b border-green-800 tracking-wide">
                Image Processing
              </div>
              <div className=" bg-gray-200 rounded-full mr-3 ml-3">
                <div
                  className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  {progress + '%'}
                </div>
              </div>
              {resultComponents}
            </div>
            {result > detectionThreshold && (
              <button
                type="button"
                onClick={handleJoinClassroom}
                className="py-2.5 px-5 mr-2 mb-2 absolute bottom-10 left-56 text-center text-sm font-medium text-white focus:outline-none bg-green-700 rounded-lg border border-green-500 hover:bg-green-600 hover:text-white"
              >
                To Classroom
                <MdOutlineArrowRightAlt className="w-5 h-5 inline-block" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinClassroomVerification;
