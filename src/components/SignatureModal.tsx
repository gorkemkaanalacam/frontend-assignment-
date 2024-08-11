import React from 'react';
import { Button, Modal } from '@mui/material';
import SignaturePad from 'react-signature-canvas';

import style from '../styles/style';

interface SignatureModalProps {
  openSignature: boolean;
  handleCloseSignature: () => void;
  sigPad: React.RefObject<SignaturePad>;
  setSignatureData: React.Dispatch<React.SetStateAction<string | null>>;
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  openSignature,
  handleCloseSignature,
  sigPad,
  setSignatureData,
}) => {
  const saveSignature = () => {
    if (sigPad.current) {
      const data = sigPad.current.toDataURL('image/png');
      setSignatureData(data);
      handleCloseSignature();
    }
  };

  return (
    <Modal
      open={openSignature}
      onClose={handleCloseSignature}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style.modal}>
        <h2 style={{ textAlign: 'center' }}>Draw Your Signature</h2>
        <SignaturePad
          ref={sigPad}
          canvasProps={{ width: 400, height: 240, className: 'signatureCanvas' }}
        />
        <Button onClick={saveSignature} style={{ margin: '10px' }}>
          Save Signature
        </Button>
      </div>
    </Modal>
  );
};

export default SignatureModal;
