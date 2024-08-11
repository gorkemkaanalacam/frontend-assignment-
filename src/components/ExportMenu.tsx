import React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface ExportMenuProps {
  optionsEl: null | HTMLElement;
  optionsOpen: boolean;
  handleOptionsClose: () => void;
  handleOpenCamera: () => void;
  handleOpenSignature: () => void;
  uploadStamp: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExportMenu: React.FC<ExportMenuProps> = ({
  optionsEl,
  optionsOpen,
  handleOptionsClose,
  handleOpenCamera,
  handleOpenSignature,
  uploadStamp,
}) => {
  return (
    <Menu anchorEl={optionsEl} open={optionsOpen} onClose={handleOptionsClose}>
      <MenuItem onClick={handleOpenCamera}>Scan</MenuItem>
      <MenuItem onClick={handleOpenSignature}>Draw Sign</MenuItem>
      <MenuItem component="label">
        Upload file
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={uploadStamp}
          title="Add Stamp"
        />
      </MenuItem>
    </Menu>
  );
};

export default ExportMenu;
