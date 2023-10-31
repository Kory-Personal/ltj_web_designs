import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { PropaneSharp } from '@mui/icons-material';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const values = {
      name: first + ' ' + last,
      email,
      number,
      message
    }

    const name = first + ' ' + last
    try {
        // const verify = process.env.REACT_APP_LOCAL
        
        const verify = 'https://isitarealemail.com/api/email/validate'
        const isVerified = await axios({
            method: 'GET',
            url: `${verify}?email=${email}`,
            auth: 
        })

        console.log(isVerified.data)
        if (isVerified.data === "valid") {
            const URL = process.env.REACT_APP_LOCAL
            await axios({
                method: 'POST',
                url: `${URL}/send`,
                data: {
                    name,
                    email,
                    number,
                    message
                },
            })
            e.target.reset();
        } 
    } catch (e) {
        alert("Please enter a valid email.")
        console.log(e);
    }

  }
  return (
    <div>
      <Button
          key={''}
          onClick={handleOpen}
          sx={{ my: 2, color: 'white', display: 'block' }}
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
              label="Multiline"
              multiline
              rows={4}
              variant="standard"
              onChange={handleLastInput}
            />
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}