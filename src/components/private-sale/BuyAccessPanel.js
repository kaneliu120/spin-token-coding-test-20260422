import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from 'react-router-dom';
import { useAppAuth } from '../../providers/AuthProvider/AuthProvider';

const BuyAccessPanel = () => {
  const { gmail, walletAddress, isGmailConnected, isWalletConnected, isAccessReady } = useAppAuth();

  const connectionItems = [
    {
      label: 'Gmail access entry',
      value: isGmailConnected ? `${gmail} (saved)` : 'Not saved for this wallet',
      icon: <MailOutlineIcon fontSize="small" />,
      ready: isGmailConnected,
    },
    {
      label: 'Wallet address',
      value: isWalletConnected ? walletAddress : 'Not connected',
      icon: <AccountBalanceWalletIcon fontSize="small" />,
      ready: isWalletConnected,
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 5,
        mb: 4,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.08))',
        border: '1px solid rgba(124,58,237,0.18)',
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={3}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Private-sale access setup
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Complete local access setup on /auth before using the buy action. The saved Gmail entry is tied to the connected wallet.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap">
              {connectionItems.map((item) => (
                <Chip
                  key={item.label}
                  icon={item.ready ? <CheckCircleIcon /> : item.icon}
                  label={`${item.label}: ${item.value}`}
                  color={item.ready ? 'success' : 'default'}
                  variant={item.ready ? 'filled' : 'outlined'}
                  sx={{ maxWidth: '100%', '& .MuiChip-label': { display: 'block' } }}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ minWidth: { xs: '100%', md: 220 } }}>
            <Button
              component={RouterLink}
              to="/auth"
              fullWidth
              variant={isAccessReady ? 'outlined' : 'contained'}
              startIcon={<LoginIcon />}
            >
              {isAccessReady ? 'Review access setup' : 'Complete access setup'}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BuyAccessPanel;
