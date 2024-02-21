import { React, useState, useRef } from 'react';

// Material UI Components
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


// Node Modules
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    boxShadow: 24,
    p: 4,
  };

export default function ChildModal(props) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const recaptcha = useRef();

  const errorHandleOpen = () => setErrorOpen(true);
  const successHandleOpen = () => setSuccessOpen(true);
  const errorHandleClose = () => setErrorOpen(false);
  const successHandleClose = () => {
    setSuccessOpen(false);
    props.reset();
    props.handleClose();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const recaptchaValue = recaptcha.current.getValue();

    try {
      if(!recaptchaValue){
        errorHandleOpen()
      } else {
        const URL = process.env.REACT_APP_LOCAL
        // const values = {
        //     name: `${props.first} ${props.last}`,
        //     email: props.email,
        //     number: props.number,
        //     message: props.message
        // }
        await axios({
          method: 'POST',
          url: `${URL}/contact-email`,
          crossDomain: true,
          data: props.formValues
        })
        successHandleOpen();
        props.reset();
      }
    } catch (e) {
      console.log(e);
    }

  }



  return (
    <div>
        <Modal
        open={errorOpen}
        onClose={errorHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Alert
            severity='warning'
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    errorHandleClose();
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={style}
            >
            You must complete the reCaptcha
            </Alert>
        </Modal>
        <Modal
        open={successOpen}
        onClose={successHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >

            <Alert
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    successHandleClose();
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={style}
            >
            I have received your message, I will get back to you as soon as I can. Thank you.
            </Alert>
        </Modal>
        <div style={{display: "flex", width: '50%', padding: "1em 0 1em 0"}}>
            <Button sx={{width: "50%"}} id='form-submit' onClick={onSubmit}>Submit</Button>
            <Button sx={{width: "50%"}} onClick={props.handleClose}>Cancel</Button>
        </div>
        <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.REACT_APP_SITE_KEY}
              style= {props.captchaMobile}
        />,
            
    </div>

  );
}