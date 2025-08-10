
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage.jsx';
import PatientDashboard from './PatientDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

function MyBookings() { return <div>My Bookings Page (TODO)</div>; }
function BookSlot() { return <div>Book Slot Page (TODO)</div>; }
function AllBookings() { return <div>All Bookings Page (TODO)</div>; }
function NotFound() { return <div>404 - Page Not Found</div>; }

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

  React.useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      setAuth(token ? { token, role } : null);
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

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
        <BrowserRouter>
          <Box component="header" sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, py: 3 }}>
            {auth && (
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
            )}
          </Box>
          <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
            <Routes>
              {/* login/register */}
              <Route path="/" element={auth ? <Navigate to={auth.role === 'admin' ? '/admin' : '/dashboard'} /> : <AuthPage setAuth={handleAuth} />} />

              {/* Patient routes */}
              <Route path="/dashboard" element={auth && auth.role === 'patient' ? <PatientDashboard auth={auth} /> : <Navigate to="/" />} />
              <Route path="/my-bookings" element={auth && auth.role === 'patient' ? <MyBookings /> : <Navigate to="/" />} />
              <Route path="/book-slot" element={auth && auth.role === 'patient' ? <BookSlot /> : <Navigate to="/" />} />

              {/* Admin routes */}
              <Route path="/admin" element={auth && auth.role === 'admin' ? <AdminDashboard auth={auth} /> : <Navigate to="/" />} />
              <Route path="/all-bookings" element={auth && auth.role === 'admin' ? <AllBookings /> : <Navigate to="/" />} />

              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;