'use client';

import { Box, Button, TextField } from '@mui/material';
import { handleSubmit } from './utils';

interface Props {}

export const LoginForm = () => {
  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoFocus
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        className="!bg-blue-600"
      >
        Sign In
      </Button>
    </Box>
  );
};
