import React from 'react';
import { Slider } from '@mui/material';
import { Brightness5, Contrast } from '@mui/icons-material';
import style from '../styles/style';

interface ImageEditorProps {
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  contrast: number;
  setContrast: React.Dispatch<React.SetStateAction<number>>;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  brightness,
  setBrightness,
  contrast,
  setContrast,
}) => {
  return (
    <div style={style.imagesContainer}>
      <div style={style.imagesInnerContainer}>
        <Brightness5 color="primary" />
        <Slider
          value={brightness}
          orientation="vertical"
          onChange={(e, value) => setBrightness(value as number)}
          aria-labelledby="brightness-slider"
          min={0}
          max={200}
          style={{ height: 180, marginTop: 20 }}
        />
      </div>
      <div style={style.contrastDiv}>
        <Contrast color="primary" />
        <Slider
          value={contrast}
          orientation="vertical"
          onChange={(e, value) => setContrast(value as number)}
          aria-labelledby="contrast-slider"
          min={0}
          max={200}
          style={{ height: 180, marginTop: 20 }}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
