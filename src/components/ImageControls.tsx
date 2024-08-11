import React from 'react';
import { Button } from '@mui/material';
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  FileDownload,
} from '@mui/icons-material';

interface ImageControlsProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  images: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({
  currentIndex,
  setCurrentIndex,
  images,
  handleClick
}) => {
  return (
    <>
      <div>
        <Button
          variant="text"
          onClick={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
          disabled={currentIndex === 0}
        >
          <ArrowCircleLeftOutlined />
        </Button>
        <span>{currentIndex + 1}</span>
        <Button
          variant="text"
          onClick={() =>
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1))
          }
          disabled={currentIndex === images.length - 1}
        >
          <ArrowCircleRightOutlined />
        </Button>
      </div>
      <Button
        variant="outlined"
        endIcon={<FileDownload fontSize="small" />}
        style={{ alignSelf: 'flex-end' }}
        onClick={handleClick}
      >
        Export
      </Button>
    </>
  );
};

export default ImageControls;
