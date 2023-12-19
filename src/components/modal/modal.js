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
  const [transitionOpen, setTransitionOpen ] = useState(true);
  const [number, setNumber] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [captcha, setCaptcha] = useState();

  const recaptcha = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseNavMenu = props.handleCloseNavMenu;

  
  const handleInput = (e) => {
    e.preventDefault();
    
    const label = e.target.id;
    
    if(label === "First Name") {
      setFirst(e.target.value)
    } else if (label === "Last Name") {
      setLast(e.target.value)
    } else if (label === "E-Mail") {
      setEmail(e.target.value)
    } else if (label === "Phone Number") {
      setNumber(e.target.value)
    } else {
      setMessage(e.target.value)
    }
  }
    const muiTestFieldProps = {
      label: "Phone Number",
      value: number,
      onChange: handleInput,
      name: "numberformat",
      id: "formatted-numberformat-input",
      variant: "standard",
    }

  const onSubmit = async (e) => {
    e.preventDefault();
    const recaptchaValue = recaptcha.current.getValue();
    console.log({email})
    const name = first + ' ' + last
    try {
      if(!recaptchaValue){
        alert("You must complete the reCaptcha Verification.")
      } else {
        const URL = process.env.REACT_APP_LOCAL
        await axios({
          method: 'POST',
          url: `${URL}/send`,
          crossDomain: true,
          data: {
            name: name,
            email: email,
            number: number,
            message:message,
            captcha
          },
        })
        // handleClose();
        return(
          <>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
            </Alert>
          </>
        )

      }
    } catch (e) {
      console.log(e);
    }

  }
  return (
    <div>
      <If condition={props.orientation === "mobile"}>
        <Then>
          <MenuItem key={''} onClick={handleOpen}>
          <Typography textAlign="center">Contact</Typography>
          </MenuItem>
        </Then>
        <Else>
          <Button
              key={''}
              onClick={handleOpen}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.5em', paddingLeft: '2rem'}}
              color='success'
              >
              Contact
          </Button>
        </Else>
      </If>
            
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="First Name"
              label="First Name"
              variant="standard"
              onChange={handleInput}
            />
            <TextField
              required
              id="Last Name"
              label="Last Name"
              variant="standard"
              onChange={handleInput}
            />
            <TextField
              required
              id="E-Mail"
              label="E-Mail"
              variant="standard"
              onChange={handleInput}
            />
            {/* <TextField
              required
              id="Phone Number"
              label="Phone Number"
              variant="standard"
              value={numberFormat}
              onChange={handleInput}
            /> */}
            <PatternFormat 
              type="tel"
              format="(###) ###-####" 
              mask="_" 
              value={number}
              required
              customInput={TextField}
              {...muiTestFieldProps}
            />
            <TextField
              fullWidth
              id="Message"
              label="Message"
              multiline
              rows={4}
              variant="standard"
              onChange={handleInput}
            />
            <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.REACT_APP_SITE_KEY}
            />,
          </div>
        </Box>
        {/* <Box>
          <Collapse in={transitionOpen!}>
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
          </Collapse>
        </Box> */}
      </Modal>
    </div>
  );
}