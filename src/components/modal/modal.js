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


// Internal Components
import ChildModal from './childModal';

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

const captchaMobile = {
  transform: 'scale(0.65)',
  transformOrigin:'0 0',
}
const mobile = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

}

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [number, setNumber] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [captcha, setCaptcha] = useState(false);
  const [values, setValues] = useState();




  const handleOpen = () => setOpen(true);
  const handleMobileOpen = () => {
    setMobileOpen(true);
    props.handleCloseNavMenu();
  }
  const handleClose = () => {
    setOpen(false);
    setMobileOpen(false);
}
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
      onChange: handleInput,
      id: "Phone Number",
      variant: "standard"
    }

  return (
    <div>
      <If condition={props.orientation === "mobile"}>
        <Then>
          <MenuItem key={''} onClick={handleMobileOpen}>
          <Typography textAlign="center">Contact</Typography>
          </MenuItem>
            <Modal
              open={mobileOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                component="form"
                sx={mobile}
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
                    id="Message"
                    label="Message"
                    multiline
                    rows={4}
                    variant="standard"
                    onChange={handleInput}
                  />
                  <ChildModal
                    first= {first}
                    last= {last}
                    email= {email}
                    message= {message}
                    number= {number}
                    style= {style}
                    handleClose= {handleClose}
                    captchaMobile= {captchaMobile}
                  />
                </div>
              </Box>
            </Modal>
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
                <ChildModal
                  first= {first}
                  last= {last}
                  email= {email}
                  message= {message}
                  number= {number}
                  style= {style}
                  handleClose= {handleClose}
                />
              </div>
            </Box>
          </Modal>
        </Else>
      </If>
            
    </div>
  );
}