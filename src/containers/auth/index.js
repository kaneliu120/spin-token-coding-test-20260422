import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppAuth } from '../../providers/AuthProvider/AuthProvider';
import { useWalletConnector, setNet } from '../../components/account/WalletConnector';

const AuthPage = () => {
  const {
    prefillGmail,
    mode,
    walletAddress,
    isWalletConnected,
    isGmailConnected,
    isAccessReady,
    saveProfile,
    setMode,
    isGmailAddress,
  } = useAppAuth();
  const { loginMetamask } = useWalletConnector();
  const [gmailInput, setGmailInput] = useState(prefillGmail);
  const [error, setError] = useState('');

  useEffect(() => {
    setGmailInput(prefillGmail);
  }, [prefillGmail]);

  const pageCopy = useMemo(() => (
    mode === 'signup'
      ? {
          title: 'Create your SPIN access',
          subtitle: 'Save a Gmail entry for the exact wallet you want to use before entering the private-sale flow.',
          action: 'Complete Sign Up',
        }
      : {
          title: 'Log in to continue buying SPIN',
          subtitle: 'Use the same Gmail address and wallet combination you plan to use in the private-sale flow.',
          action: 'Log In',
        }
  ), [mode]);

  const handleSave = () => {
    if (!isWalletConnected) {
      setError('Connect the wallet you want to use in the current private-sale flow before saving a Gmail entry.');
      return;
    }

    const nextGmail = gmailInput.trim();
    if (!isGmailAddress(nextGmail)) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    const didSave = saveProfile(nextGmail, mode);
    if (!didSave) {
      setError('Wallet connection is required before saving access setup.');
      return;
    }

    setError('');
  };

  const handleConnectWallet = () => {
    setNet(1);
    loginMetamask();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 10,
        background: 'linear-gradient(180deg, #0a0a0f 0%, #111126 100%)',
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            borderRadius: 6,
            border: '1px solid rgba(124,58,237,0.22)',
            background: 'linear-gradient(135deg, rgba(19,19,43,0.96) 0%, rgba(10,10,15,0.96) 100%)',
            color: '#fff',
            boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography sx={{ color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, mb: 1 }}>
              Access Setup
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              {pageCopy.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 680, lineHeight: 1.7, mb: 4 }}>
              {pageCopy.subtitle}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', maxWidth: 680, lineHeight: 1.7, mb: 4 }}>
              This page stores your Gmail entry locally in this browser and links it to the connected wallet. It does not perform Google OAuth.
            </Typography>

            <Tabs
              value={mode}
              onChange={(_, value) => setMode(value)}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{ mb: 4, '& .MuiTab-root': { color: 'rgba(255,255,255,0.55)' } }}
            >
              <Tab label="Log In" value="login" />
              <Tab label="Sign Up" value="signup" />
            </Tabs>

            <Stack spacing={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: '1px solid rgba(6,182,212,0.24)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                    <GoogleIcon sx={{ color: '#67e8f9' }} />
                    <Typography sx={{ color: '#fff', fontWeight: 700 }}>Gmail access entry</Typography>
                    {isGmailConnected ? <Chip size="small" icon={<CheckCircleIcon />} label="Saved for this wallet" color="success" /> : null}
                  </Stack>
                  <TextField
                    fullWidth
                    label="Gmail address"
                    value={gmailInput}
                    onChange={(event) => setGmailInput(event.target.value)}
                    placeholder="yourname@gmail.com"
                    variant="outlined"
                    error={Boolean(error)}
                    helperText={
                      error
                      || (
                        isWalletConnected
                          ? 'This Gmail entry is saved locally for the connected wallet only.'
                          : 'Connect the wallet you will use in the current private-sale flow, then save a Gmail entry for it.'
                      )
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.03)', color: '#fff' },
                      '& .MuiFormLabel-root': { color: 'rgba(255,255,255,0.65)' },
                      '& .MuiFormHelperText-root': { color: error ? undefined : 'rgba(255,255,255,0.5)' },
                    }}
                  />
                  <Button variant="contained" startIcon={<GoogleIcon />} onClick={handleSave}>
                    {pageCopy.action}
                  </Button>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: '1px solid rgba(245,158,11,0.24)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                    <WalletIcon sx={{ color: '#fbbf24' }} />
                    <Typography sx={{ color: '#fff', fontWeight: 700 }}>Wallet address</Typography>
                    {isWalletConnected ? <Chip size="small" icon={<CheckCircleIcon />} label="Connected" color="success" /> : null}
                  </Stack>
                  <Typography sx={{ color: 'rgba(255,255,255,0.68)', mb: 2 }}>
                    {isWalletConnected
                      ? `Connected wallet: ${walletAddress}`
                      : 'Connect the wallet you will use in the current private-sale flow, then save a Gmail entry for that wallet.'}
                  </Typography>
                  <Button variant="outlined" startIcon={<WalletIcon />} onClick={handleConnectWallet}>
                    {isWalletConnected ? 'Reconnect Wallet' : 'Connect Wallet'}
                  </Button>
                </CardContent>
              </Card>
            </Stack>

            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 4,
                border: '1px solid rgba(124,58,237,0.24)',
                background: 'rgba(124,58,237,0.08)',
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1 }}>Current access status</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.72)', mb: 2 }}>
                {isAccessReady
                  ? 'Your current wallet has a saved Gmail access entry. You can continue to the private-sale page and use the buy action for this wallet.'
                  : 'Complete wallet connection and save a Gmail entry for this wallet before using the buy action.'}
              </Typography>
              <Button
                component={RouterLink}
                to="/private-sale"
                variant="contained"
                color="secondary"
                disabled={!isAccessReady}
              >
                Continue to private sale
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AuthPage;
