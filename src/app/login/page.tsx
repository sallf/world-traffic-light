import * as React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoginForm } from './LoginForm';


export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LockOutlinedIcon />
      <LoginForm />
    </div>
  );
}
