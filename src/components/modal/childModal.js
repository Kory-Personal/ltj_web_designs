import { React, useState, useRef } from 'react';

// Material UI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

// Node Modules
import { If, Then, Else } from "react-if";
import { PatternFormat } from 'react-number-format';

import axios from 'axios';


// Internal Components
import ReCAPTCHA from "react-google-recaptcha";

const style = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);

  const childHandleOpen = () => setOpen(true);
  const childHandleClose = () => setOpen(false);
  const childHandleCloseNavMenu = props.childHandleCloseNavMenu;

  


  return (
    <div>
      <If condition={!props.validation}>
        <Then>
            <Modal
            open={open}
            onClose={childHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setTransitionOpen(true);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    You must complete the reCaptcha
                    </Alert>
                </Box>
            </Modal>
        </Then>
        <Else>
            <Modal
            open={open}
            onClose={childHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setTransitionOpen(true);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    I have received your message, I will get back to you as soon as I can. Thank you.
                    </Alert>
                </Box>
            </Modal>

        </Else>
      </If>
            
    </div>
  );
}