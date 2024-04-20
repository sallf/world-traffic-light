import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginForm } from '@world-traffic-light/components';

export default function Login() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  );
}
