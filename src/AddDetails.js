import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Container, Snackbar } from '@mui/material';

const AddDetails = ({ onClose, temp, setTemp }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (gender.trim() === '') {
      errors.gender = 'Gender is required';
      isValid = false;
    }

    if (age.trim() === '') {
      errors.age = 'Age is required';
      isValid = false;
    } else if (isNaN(age) || parseInt(age) < 1) {
      errors.age = 'Invalid age';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios.post('http://localhost:3001/api/users', { name, gender, age }).then((response) => {
      setSuccessMessage('User added successfully');
      setIsSnackbarOpen(true);
      onClose();
      setTemp(temp + 1);
    });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" className="mx-auto my-8">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Add Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Gender"
          variant="outlined"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.gender}
          helperText={errors.gender}
        />
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.age}
          helperText={errors.age}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} message={successMessage} />
    </Container>
  );
};

export default AddDetails;
