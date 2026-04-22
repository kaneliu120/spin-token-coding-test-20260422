'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SITE_CONFIG } from '../../constants/spinTokenData';
import spinLogo from '../../assets/images/spin.png';

const SpinHeroSection = () => {
  const { whitepaperUrl, communityLinks } = SITE_CONFIG;

  return (
    <Box
      className="spin-hero-bg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: 10,
        pb: 8,
      }}
    >
      <Container maxWidth="md">
        {/* Logo */}
        <Box className="spin-fade-in-up-1 spin-float" sx={{ mb: 4 }}>
          <Box
            className="spin-glow"
            sx={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              mx: 'auto',
              overflow: 'hidden',
            }}
          >
            <img
              src={spinLogo}
              alt="SPIN Token Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* Headline */}
        <Typography
          component="h1"
          className="spin-fade-in-up-2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          The Utility Token Powering the{' '}
          <span className="spin-gradient-text">SpinBattles</span> Gaming Ecosystem
        </Typography>

        {/* Subheadline */}
        <Typography
          className="spin-fade-in-up-3"
          sx={{ color: 'rgba(255,255,255,0.65)', fontSize: { xs: '1rem', md: '1.2rem' }, mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          Private sale is now open at $0.10 per SPIN, with support for USDT, ETH, and credit card purchases on the ERC-20 flow.
        </Typography>

        {/* CTAs */}
        <Stack
          className="spin-fade-in-up-4"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          {whitepaperUrl ? (
            <Button
              component="a"
              href={whitepaperUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              className="spin-btn-primary"
              sx={{ borderRadius: 2, px: 4 }}
            >
              View Whitepaper
            </Button>
          ) : (
            <Button
              disabled
              variant="outlined"
              size="large"
              sx={{ borderRadius: 2, px: 4, opacity: 0.5 }}
            >
              Whitepaper — Coming Soon
            </Button>
          )}

          <Button
            component="a"
            href={communityLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="large"
            className="spin-btn-outline"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Join Community
          </Button>

          <Button
            component="a"
            href="/private-sale"
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              bgcolor: '#f59e0b',
              color: '#000',
              fontWeight: 700,
              '&:hover': { bgcolor: '#d97706' },
            }}
          >
            Enter Private Sale
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default SpinHeroSection;
