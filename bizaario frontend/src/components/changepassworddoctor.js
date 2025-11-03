import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Modal, Box, Typography, TextField, Button, Alert } from '@mui/material';
import api from '../api'; // Your axios instance or API helper

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/doctor/changedpassword',{email, oldPassword, newPassword });

      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: response.data.message || 'Password updated successfully',
        showConfirmButton:true
      });

      setOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to change password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Change Password
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="change-password-title">
        <Box sx={modalStyle}>
          <Typography id="change-password-title" variant="h6" component="h2" gutterBottom>
            Change Password
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            disabled={loading}
            size='small'
          />
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={loading}
             size='small'
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
             size='small'
          />

          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
             size='small'
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
