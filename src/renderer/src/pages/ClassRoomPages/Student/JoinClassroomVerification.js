import React, { useEffect, useRef } from 'react';
import {
  MdOutlineVideocam,
  MdOutlineVerifiedUser,
  MdOutlineVideocamOff,
} from 'react-icons/md';
import * as faceapi from '@vladmandic/face-api';
import {
  setIsWebcamActive,
  setPercentageCount,
  setVerificationResult,
  usePostJoinClassroomMutation,
  setStudents,
} from '../../../store';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleWebCam } from '../../../utils/webcam';
import { setLandmarkModels } from '../../../utils/setLandmarkModels';
import './style.css';

const JoinClassroomVerification = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { classroomId } = params;
  const dispatch = useDispatch();
  const [postJoinClassroom, { isSuccess, data, error }] =
    usePostJoinClassroomMutation();
  const { isWebcamActive, percentageCount, verificationResult } = useSelector(
    (state) => {
      return state.app;
    }
  );

  let resultComponents = '';
  if (verificationResult >= 0.75) {
    resultComponents = <p>Verification passed</p>;
  } else if (verificationResult >= 0 && verificationResult < 0.75) {
    resultComponents = <p>Verification Fail</p>;
  } else {
    resultComponents = ' ';
  }

  const imagesArray = [];
  const videoRef = useRef();
  const canvasRef = useRef();

  const captureAndVerify = async () => {
    dispatch(setPercentageCount(0));
    const detectionResults = [];
    let count = 0;
    const captureImage = async () => {
      try {
        const track = videoRef.current.srcObject.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        return await imageCapture.takePhoto();
      } catch (err) {
        console.error('Error capturing image:', err);
        return null;
      }
    };
    for (let i = 0; i < 5; i++) {
      const images = await captureImage();
      imagesArray.push(images);
    }
    for (const element of imagesArray) {
      const image = await faceapi.bufferToImage(element);
      const detections = await faceapi
        .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      const confidence =
        detections && detections.length > 0 ? detections[0].detection.score : 0;
      detectionResults.push(confidence);
    }

    const overallScore =
      detectionResults.reduce((total, score) => total + score, 0) /
      detectionResults.length;

    const intervalId = setInterval(() => {
      count++;
      dispatch(setPercentageCount((count / 5) * 100));
      if (count === 5) {
        dispatch(setVerificationResult(overallScore));
        if (overallScore >= 0.75) {
          postJoinClassroom({ images: imagesArray, classroomId });
        }
        count = 1;
        handleWebCam(videoRef, dispatch, setIsWebcamActive, isWebcamActive);

        clearInterval(intervalId);
      }
    }, 1000);
  };

  useEffect(() => {
    setLandmarkModels(faceapi);
    if (isSuccess) {
      dispatch(setStudents(data.students));
      navigate(`../../${classroomId}`);
    }
  }, [isSuccess]);
  const activeClass =
    'text-white flex-col bg-[#06603a] hover:bg-[#3fa97b]/90  focus:outline-none  font-medium rounded-lg text-center inline-flex items-center w-32';
  const inactiveClass =
    'text-white flex-col bg-gray-400   focus:outline-none  font-medium rounded-lg text-center inline-flex items-center w-32';

  return (
    <div className="h-full w-full overflow-y-auto overscroll-contain">
      <p className="mt-20 text-3xl font-bold w-screen flex justify-center">
        Image Verification
      </p>

      <div className="antialiased max-w-6xl mx-auto my-12 bg-gray-300 px-8">
        <div className="relative block md:flex items-center">
          <div className="w-full md:w-1/2 relative z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              width="600"
              height="450"
              className="w-full h-96"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="flex justify-around bg-gray-200 p-3  text-gray-800">
              <button
                onClick={() =>
                  handleWebCam(
                    videoRef,
                    dispatch,
                    setIsWebcamActive,
                    isWebcamActive
                  )
                }
                type="button"
                className="text-white flex-col bg-[#06603a] hover:bg-[#3fa97b]/90  focus:outline-none  font-medium rounded-lg text-center inline-flex items-center w-32"
              >
                {isWebcamActive ? (
                  <MdOutlineVideocam className="w-10 h-12" />
                ) : (
                  <MdOutlineVideocamOff className="w-10 h-12" />
                )}
                {isWebcamActive ? 'Off WebCam' : 'On WebCam'}
              </button>
              <button
                onClick={captureAndVerify}
                type="button"
                disabled={!isWebcamActive}
                className={isWebcamActive ? activeClass : inactiveClass}
              >
                <MdOutlineVerifiedUser className="w-10 h-12" />
                Verify Self
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative z-0 px-8 md:px-0 md:py-16">
            <div className="bg-blue-900 text-white rounded-b md:rounded-b-none md:rounded-r shadow-lg overflow-hidden">
              <div className="text-lg font-medium uppercase p-8 text-center border-b border-blue-800 tracking-wide">
                Image Processing
              </div>
              <div className=" bg-gray-200 rounded-full mr-3 ml-3">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${percentageCount}%` }}
                >
                  {percentageCount + '%'}
                </div>
              </div>

              <a
                className="flex items-center justify-center bg-blue-800 hover:bg-blue-700 p-8 text-md font-semibold text-gray-300 uppercase mt-8"
                href="#"
              >
                {resultComponents}
                <span className="font-medium text-gray-300 ml-2">➔</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinClassroomVerification;
