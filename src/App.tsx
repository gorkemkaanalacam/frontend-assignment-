import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import Tesseract from 'tesseract.js';
import SignaturePad from 'react-signature-canvas';
import { Button, Menu, MenuItem } from '@mui/material';
import { toPng } from 'html-to-image';
import {
  DocumentScanner,
  MoreOutlined,
  Save,
} from '@mui/icons-material';

import WebcamModal from './components/WebcamModal';
import SignatureModal from './components/SignatureModal';
import ImageEditor from './components/ImageEditor';
import ImageControls from './components/ImageControls';
import ExportMenu from './components/ExportMenu';
import style from './styles/style';
import { Rnd } from 'react-rnd';

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const sigPad = useRef<SignaturePad>(null);
  const signedImage = useRef<HTMLDivElement>(null);
  const documentContainer = useRef<HTMLImageElement>(null);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [stamp, setStamp] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [openCamera, setOpenCamera] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [photoTaking, setPhotoTaking] = useState(false);
  const [signatureSize, setSignatureSize] = useState({ width: 50, height: 30 });
  const [stampSize, setStampSize] = useState({ width: 50, height: 30 });
  const [stampDragPosition, setStampDragPosition] = useState({ x: 0, y: 0 });
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionsEl, setOptionsEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const optionsOpen = Boolean(optionsEl);

  const handleSave = async () => {
    setPhotoTaking(true);
    // there is problem this library on mobile browsers so I did workaround like that:
    await toPng(signedImage.current as HTMLDivElement, {
      cacheBust: false,
    });
    await toPng(signedImage.current as HTMLDivElement, {
      cacheBust: false,
    });
    await toPng(signedImage.current as HTMLDivElement, {
      cacheBust: false,
    });
    const dataUrl = await toPng(signedImage.current as HTMLDivElement, {
      cacheBust: false,
    });
    const newImages = images;
    newImages[currentIndex] = dataUrl;
    setImages(newImages);
    setBrightness(100);
    setContrast(100);
    setSignatureData(null);
    setStamp(null);
    setPhotoTaking(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionsClose = () => {
    setOptionsEl(null);
  };

  const handleOpenCamera = () => setOpenCamera(true);
  const handleCloseCamera = () => setOpenCamera(false);
  const handleOpenSignature = () => setOpenSignature(true);
  const handleCloseSignature = () => setOpenSignature(false);

  const saveAsPDf = () => {
    if (images.length > 0) {
      const pdf = new jsPDF();
      setPhotoTaking(true);
      images.forEach((image, index) => {
        if (index > 0) pdf.addPage();
        pdf.addImage(image, 'JPEG', 0, 0, 210, 297); // Adjust size based on your requirement
      });
      pdf.save('document.pdf');
      setPhotoTaking(false);
    }
  };

  const saveAsJPG = () => {
    const link = document.createElement('a');
    link.download = 'my-image-name.png';
    link.href = images[currentIndex];
    link.click();
  };

  const saveAsText = async () => {
    const { data: { text } } = await Tesseract.recognize(images[currentIndex]);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
  };

  const saveAsWord = async () => {
    try {
      const { data: { text } } = await Tesseract.recognize(images[currentIndex]);
      const html = `
        <!DOCTYPE html>
        <html style="width:210px; height:297px;">
          <head style="width:210px; height:297px;">
            <title>Document</title>
          </head>
          <body style="width:210px; height:297px;">
            <p>${text.replace(/\n/g, '</p><p>')}</p>
            <img src="${signatureData}" style="position: absolute; top:${dragPosition.y + 148.5}px; left:${dragPosition.x + 105}px;"/>
            <img src="${stamp}" style="position: absolute; top:${stampDragPosition.y + 148.5}px; left:${stampDragPosition.x + 105}px;"/>
          </body>
        </html>
      `;

      const blob = new Blob([html], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(blob, 'document.docx');
    } catch (error) {
      console.error('Error saving as Word document:', error);
    }
  };

  const uploadStamp = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStamp(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={
        images.length === 0
          ? { ...style.container, background: '#FFF' }
          : style.container
      }
    >
      <div style={style.innerContainer}>
        {images.length === 0 && (
          <div style={style.buttonContainer}>
            <Button
              variant="contained"
              onClick={handleOpenCamera}
              endIcon={<DocumentScanner fontSize="large" />}
            >
              Scan
            </Button>
          </div>
        )}

        {images.length > 0 &&
          <ImageEditor
            brightness={brightness}
            setBrightness={setBrightness}
            contrast={contrast}
            setContrast={setContrast}
          />
        }

        {images.length > 0 && <div style={style.brightnessDiv}>
          <Button variant="outlined" onClick={(event) => setOptionsEl(event.currentTarget)}>
            <MoreOutlined fontSize="medium" />
          </Button>
          <Button variant="outlined" onClick={() => void handleSave()} endIcon={<Save fontSize="small" />}>
            Save
          </Button>
        </div>}

        <WebcamModal
          openCamera={openCamera}
          handleCloseCamera={handleCloseCamera}
          webcamRef={webcamRef}
          setImages={setImages}
        />

        <SignatureModal
          openSignature={openSignature}
          handleCloseSignature={handleCloseSignature}
          sigPad={sigPad}
          setSignatureData={setSignatureData}
        />

        {images.length > 0 && (
          <div style={style.imagesContainer}>

            <div style={{ display: 'flex' }}>
              <div ref={signedImage} style={style.signedImage}>
                <img
                  ref={documentContainer}
                  src={images[currentIndex]}
                  width={'100%'}
                  height={'100%'}
                  style={{
                    objectFit: 'cover',
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  }}
                />
                {signatureData && (
                  <Rnd
                    style={photoTaking ? {} : { border: '1px dashed blue' }}
                    size={{ width: signatureSize.width, height: signatureSize.height }}
                    position={dragPosition}
                    onDragStop={(e: unknown, data: { x: number, y: number }) => setDragPosition({ x: data.x, y: data.y })}
                    onResizeStop={(e: unknown, direction: unknown, ref: { style: { width: string, height: string } }, delta: unknown, position: { x: number, y: number }) => {
                      setSignatureSize({
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                      });
                      setDragPosition({ x: position.x, y: position.y });
                    }}
                  >
                    <img
                      src={signatureData}
                      alt="Signature"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Rnd>
                )}
                {stamp && (
                  <Rnd
                    bounds="parent"
                    style={photoTaking ? {} : { border: '1px dashed blue' }}
                    size={{ width: stampSize.width, height: stampSize.height }}
                    position={stampDragPosition}
                    onDragStop={(e: unknown, data: { x: number, y: number }) => setStampDragPosition({ x: data.x, y: data.y })}
                    onResizeStop={(e: unknown, direction: unknown, ref: { style: { width: string, height: string } }, delta: unknown, position: { x: number, y: number }) => {
                      setStampSize({
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                      });
                      setStampDragPosition({ x: position.x, y: position.y });
                    }}
                  >
                    <img
                      src={stamp}
                      alt="stamp"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Rnd>
                )}
              </div>
            </div>

            <ExportMenu
              optionsEl={optionsEl}
              optionsOpen={optionsOpen}
              handleOptionsClose={handleOptionsClose}
              handleOpenCamera={handleOpenCamera}
              handleOpenSignature={handleOpenSignature}
              uploadStamp={uploadStamp}
            />

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={saveAsPDf}>Export All as Pdf</MenuItem>
              <MenuItem onClick={saveAsJPG}>Export as Jpg</MenuItem>
              <MenuItem onClick={() => void saveAsWord()}>Export as Word</MenuItem>
              <MenuItem onClick={() => void saveAsText()}>Export as Text</MenuItem>
            </Menu>

            <ImageControls
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              images={images}
              handleClick={(event) => setAnchorEl(event.currentTarget)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
