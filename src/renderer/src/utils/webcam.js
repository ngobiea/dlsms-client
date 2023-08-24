export const handleWebCam = (
  videoRef,
  dispatch,
  setIsWebcamActive,
  isWebcamActive
) => {
  if (!isWebcamActive) {
    console.log('Webcam is already on');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        dispatch(setIsWebcamActive(true));
      })
      .catch((error) => {
        console.log('Error accessing webcam', error);
      });
  } else {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    dispatch(setIsWebcamActive(false));
  }
};
