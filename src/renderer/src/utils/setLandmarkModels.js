export const setLandmarkModels = async (faceapi) => {
  try {
    const { modelsPath } = await window.account.getPaths();
    console.log(modelsPath);
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);

    console.log('Landmarks Models Loaded Successfully');
  } catch (error) {
    console.log('Error occur while Loading models', error);
  }
};
