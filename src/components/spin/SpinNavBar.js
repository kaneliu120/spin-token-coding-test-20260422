import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { SITE_CONFIG } from '../../constants/spinTokenData';
import spinLogo from '../../assets/images/spin.png';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Utility',    href: '#utility' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap',    href: '#roadmap' },
  { label: 'Team',       href: '#team' },
  { label: 'FAQ',        href: '#faq' },
];

const SpinNavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { whitepaperUrl } = SITE_CONFIG;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(13,13,26,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : 'none',
          transition: 'background-color 0.3s ease, border-bottom 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
            <img
              src={spinLogo}
              alt="SPIN Token Logo"
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            />
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: 0.5 }}>
              Spin<span style={{ color: '#7c3aed' }}>Battles</span>
            </Typography>
          </Box>

          {/* Desktop links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component="a"
                href={link.href}
                size="small"
                sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500, '&:hover': { color: '#fff', bgcolor: 'rgba(124,58,237,0.1)' }, borderRadius: 2 }}
              >
                {link.label}
              </Button>
            ))}
            {whitepaperUrl ? (
              <Button
                component="a"
                href={whitepaperUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                sx={{ ml: 1, borderColor: 'rgba(124,58,237,0.6)', color: '#a78bfa', '&:hover': { borderColor: '#7c3aed', bgcolor: 'rgba(124,58,237,0.1)' }, borderRadius: 2 }}
              >
                Whitepaper
              </Button>
            ) : (
              <Button
                disabled
                variant="outlined"
                size="small"
                sx={{ ml: 1, borderRadius: 2, opacity: 0.4, fontSize: '0.75rem' }}
              >
                Whitepaper — Soon
              </Button>
            )}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { bgcolor: '#0d0d1a', width: 260, borderLeft: '1px solid rgba(124,58,237,0.2)' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.href}
              component="a"
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(124,58,237,0.1)', color: '#fff' } }}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
          <Box sx={{ px: 2, pt: 2 }}>
            {whitepaperUrl ? (
              <Button fullWidth component="a" href={whitepaperUrl} target="_blank" rel="noopener noreferrer"
                variant="outlined" sx={{ borderColor: 'rgba(124,58,237,0.5)', color: '#a78bfa' }}>
                Whitepaper
              </Button>
            ) : (
              <Button fullWidth disabled variant="outlined" sx={{ opacity: 0.4 }}>
                Whitepaper — Coming Soon
              </Button>
            )}
          </Box>
        </List>
      </Drawer>
    </>
  );
};

export default SpinNavBar;
