import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Modal, Fade, Box } from '@mui/material';
import AddDetails from './AddDetails';

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users').then((response) => {
      setUsers(response.data);
    });
  }, [temp]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" className="mx-auto my-8">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        User Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add Details
        </Button>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
          >
            <Box bgcolor="white" p={4} borderRadius={8}>
              <AddDetails onClose={handleCloseModal} temp={temp} setTemp={setTemp} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default MainPage;
