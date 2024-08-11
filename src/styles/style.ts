import { CSSProperties } from 'react';

const halfOfScreen = window.innerWidth > 430 ? 430 / 2 : window.innerWidth / 2;

const style: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#00000099',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 430,
    maxHeight: 932,
    backgroundColor: '#FFF',
    padding: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    width: 120,
    right: halfOfScreen - 60,
    bottom: 20,
  },
  switchButton: { position: 'absolute', right: 0, top: 20 },
  imagesContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  imagesInnerContainer: {
    position: 'absolute',
    left: 0,
    top: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contrastDiv: {
    position: 'absolute',
    right: 0,
    top: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  brightnessDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  signedImage: {
    position: 'relative',
    width: 210,
    height: 297,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '100%',
    maxWidth: 430,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    boxShadow: '24',
  },
};

export default style;
