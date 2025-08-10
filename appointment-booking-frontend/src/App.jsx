
import React, { useState } from 'react';
import AuthPage from './AuthPage.jsx';
import PatientDashboard from './PatientDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#90caf9', 
      contrastText: '#1976d2',
    },
    background: {
      default: '#f6f8fa',
      paper: '#fff',
    },
    text: {
      primary: '#263238',
      secondary: '#607d8b',
    },
    divider: '#e0e0e0',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    button: { fontWeight: 600, letterSpacing: 0.5 },
  },
  transitions: {
    duration: {
      enteringScreen: 400,
      leavingScreen: 300,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 24px',
          background: '#1976d2',
          color: '#fff',
          transition: 'background 0.2s, transform 0.2s',
          '&:hover': {
            background: '#1565c0',
            transform: 'scale(1.03)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px 0 rgba(33,150,243,0.08)',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});

function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return token ? { token, role } : null;
  });

  const handleAuth = ({ token, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuth({ token, role });
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f6f8fa 0%, #e3f2fd 100%)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {auth ? (
          <>
            <Box component="header" sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, py: 3 }}>
              <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                  sx={{
                    fontWeight: 600,
                    borderRadius: 3,
                    boxShadow: 3,
                    px: 3,
                    py: 1.5,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.07)' },
                  }}
                >
                  Logout
                </Button>
              </Slide>
            </Box>
            <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box sx={{ bgcolor: 'background.paper', borderRadius: 4, boxShadow: 6, p: 4 }}>
                  {auth.role === 'admin' ? (
                    <AdminDashboard auth={auth} />
                  ) : (
                    <PatientDashboard auth={auth} />
                  )}
                </Box>
              </Slide>
            </Container>
          </>
        ) : (
          <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <Box sx={{ bgcolor: 'background.paper', borderRadius: 4, boxShadow: 6, p: 4, width: '100%' }}>
                <AuthPage setAuth={handleAuth} />
              </Box>
            </Slide>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;