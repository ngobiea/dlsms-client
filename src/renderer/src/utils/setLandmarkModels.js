import { ipcRenderer } from "electron";
export const setLandmarkModels = async (faceapi) => {
  try {
    const { modelsPath } = await ipcRenderer.invoke('paths');
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath);
    console.log('Landmarks Models Loaded Successfully');
  } catch (error) {
    console.log('Error occur while Loading models', error);
  }
};
