import TryIcon from '@mui/icons-material/Try';
import Typography from '@mui/material/Typography';
import router from '../Router';

function Branding() {
  return (
    <>
        <TryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => router.navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            WhatTheChat
          </Typography>
    </>
  );
}

export default Branding;