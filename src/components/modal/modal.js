import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { If, Then, Else } from "react-if";

import axios from 'axios';

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
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState();
  const [first, setFirst] = React.useState();
  const [last, setLast] = React.useState();
  const [email, setEmail] = React.useState();
  const [message, setMessage] = React.useState();
  const [captcha, setCaptcha] = React.useState();
  const [recaptchaValid, setRecaptchaValid] = React.useState(false);

  const recaptchaRef = React.createRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseNavMenu = props.handleCloseNavMenu;

  const handleLastInput = (e) => {
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

  const onChange = (value) => {
    console.log("Captcha value:", value);
    console.log({recaptchaRef})
    const recaptchaValue = recaptchaRef.current.getValue();

    if(recaptchaValue != ''){
      setRecaptchaValid(true);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({email})
    const name = first + ' ' + last
    try {
      if(recaptchaValid){

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
        handleClose();
      } else {
        alert("You must complete the reCaptcha Verification.")
      }
    } catch (e) {
      alert("Please enter a valid email.")
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
              sx={{ my: 2, color: 'white', display: 'block' }}
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
              onChange={handleLastInput}
            />
            <TextField
              required
              id="Last Name"
              label="Last Name"
              variant="standard"
              onChange={handleLastInput}
            />
            <TextField
              required
              id="E-Mail"
              label="E-Mail"
              variant="standard"
              onChange={handleLastInput}
            />
            <TextField
              required
              id="Phone Number"
              label="Phone Number"
              variant="standard"
              onChange={handleLastInput}
            />
            <TextField
              fullWidth
              id="Message"
              label="Message"
              multiline
              rows={4}
              variant="standard"
              onChange={handleLastInput}
            />
            <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={onChange}
            />,
          </div>
        </Box>
      </Modal>
    </div>
  );
}