import React from 'react';
import { Button, Modal } from '@mui/material';
import Webcam from 'react-webcam';
import { PhotoCamera, Cameraswitch } from '@mui/icons-material';

import style from '../styles/style';

interface WebcamModalProps {
  openCamera: boolean;
  handleCloseCamera: () => void;
  webcamRef: React.RefObject<Webcam>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const WebcamModal: React.FC<WebcamModalProps> = ({
  openCamera,
  handleCloseCamera,
  webcamRef,
  setImages
}) => {
  const [facingMode, setFacingMode] = React.useState('user');

  const videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
  };

  const handleSwitchClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  const captureImage = () => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImages((prevImages) => [...prevImages, image]);
      handleCloseCamera();
    }
  };

  return (
    <Modal
      open={openCamera}
      onClose={handleCloseCamera}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style.modal}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotQuality={1}
          screenshotFormat="image/png"
          width={'100%'}
          height={'100%'}
          videoConstraints={videoConstraints}
        />
        <Button style={style.cameraButton} onClick={captureImage}>
          <PhotoCamera color="action" fontSize="large" />
        </Button>
        <Button style={style.switchButton} onClick={handleSwitchClick}>
          <Cameraswitch color="action" fontSize="large" />
        </Button>
      </div>
    </Modal>
  );
};

export default WebcamModal;
