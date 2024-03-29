import { React, useState } from 'react';

// Material UI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// Node Modules
import { If, Then, Else } from "react-if";
import { PatternFormat } from 'react-number-format';


// Internal Components
import ChildModal from '../modal/childModal';

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
  display: 'block',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

}

export default function ContactPage(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    first: "",
    last: "",
    email: "",
    message: "",
    number: ""
  })




  const handleMobileOpen = () => {
    setMobileOpen(true);
    props.handleCloseNavMenu();
  }
  const handleClose = () => {
    setMobileOpen(false);
}
  
  const handleInput = (e) => {
    e.preventDefault();
    
    const label = e.target.id;
    
    if(label === "First Name") {
      setFormValues({...formValues, first: e.target.value})
    } else if (label === "Last Name") {
      setFormValues({...formValues, last: e.target.value})
    } else if (label === "E-Mail") {
      setFormValues({...formValues, email: e.target.value})
    } else if (label === "Phone Number") {
      setFormValues({...formValues, number: e.target.value})
    } else {
      setFormValues({...formValues, message: e.target.value})
    }
    
  }

  const reset = (e) => {
    setFormValues({
      first: "",
      last: "",
      email: "",
      number: "",
      message: ""
    })
  }
    const muiTestFieldProps = {
      fullWidth: true,
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
                autoComplete="on"
              >
                <div>
                  <TextField
                    required
                    fullWidth
                    id="First Name"
                    label="First Name"
                    variant="standard"
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    id="Last Name"
                    label="Last Name"
                    variant="standard"
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    id="E-Mail"
                    label="E-Mail"
                    variant="standard"
                    onChange={handleInput}
                    value={formValues.email}
                  />
                  <PatternFormat 
                    type="tel"
                    format="(###) ###-####" 
                    mask="_" 
                    value={formValues.number}
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
                    reset={reset}
                    formValues={formValues}
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
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.5em', paddingLeft: '2rem'}}
              color='success'
              >
              Contact
          </Button>
            <Box
              component="form"
              sx={style}
              noValidate
              autoComplete="on"
            >
              <div>
                <TextField
                  required
                  id="First Name"
                  label="First Name"
                  variant="standard"
                  onChange={handleInput}
                  value={formValues.first}
                />
                <TextField
                  required
                  id="Last Name"
                  label="Last Name"
                  variant="standard"
                  onChange={handleInput}
                  value={formValues.last}
                />
                <TextField
                  required
                  id="E-Mail"
                  label="E-Mail"
                  variant="standard"
                  onChange={handleInput}
                  value={formValues.email}
                />
                <PatternFormat 
                  type="tel"
                  format="(###) ###-####" 
                  mask="_" 
                  value={formValues.number}
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
                  value={formValues.message}
                />
                <ChildModal
                  reset={reset}
                  formValues={formValues}
                  style= {style}
                  handleClose= {handleClose}
                />
              </div>
            </Box>
        </Else>
      </If>
            
    </div>
  );
}