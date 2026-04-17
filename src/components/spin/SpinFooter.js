import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SITE_CONFIG } from '../../constants/spinTokenData';
import DiscordIcon from '../ui/icons/Discord';

const SpinFooter = () => {
  const [copied, setCopied] = useState(false);
  const { communityLinks, contactEmail, contractAddress, legalDisclaimer, jurisdictionDisclaimer, copyrightYear } = SITE_CONFIG;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ bgcolor: '#0a0a0f', borderTop: '1px solid rgba(124,58,237,0.2)', pt: 6, pb: 4 }}>
      <Container>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>
              <span className="spin-gradient-text">SPIN</span> Token
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, mb: 2 }}>
              The utility token powering the SpinBattles gaming ecosystem.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton component="a" href={communityLinks.twitter} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#06b6d4' } }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton component="a" href={communityLinks.telegram} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#06b6d4' } }}>
                <TelegramIcon fontSize="small" />
              </IconButton>
              <IconButton component="a" href={communityLinks.discord} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#06b6d4' } }}>
                <DiscordIcon style={{ width: 20, height: 20 }} />
              </IconButton>
              <IconButton component="a" href={`mailto:${contactEmail}`} size="small" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#06b6d4' } }}>
                <EmailIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Links */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>Quick Links</Typography>
            {['#about', '#utility', '#tokenomics', '#roadmap', '#team', '#faq'].map((href) => (
              <Box key={href} sx={{ mb: 1 }}>
                <Box component="a" href={href} sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { color: '#a78bfa' }, textTransform: 'capitalize' }}>
                  {href.replace('#', '')}
                </Box>
              </Box>
            ))}
          </Grid>

          {/* Contract */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>Contract Address</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all', mb: 1.5 }}>
              {contractAddress ?? 'TBA — published at launch'}
            </Typography>
            {contractAddress && (
              <CopyToClipboard text={contractAddress} onCopy={handleCopy}>
                <Button size="small" variant="outlined" sx={{ borderColor: 'rgba(124,58,237,0.4)', color: copied ? '#06b6d4' : '#a78bfa', fontSize: '0.75rem' }}>
                  {copied ? 'Copied!' : 'Copy Address'}
                </Button>
              </CopyToClipboard>
            )}
          </Grid>
        </Grid>

        <hr className="spin-divider" />

        {/* Legal */}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', lineHeight: 1.7, mb: 1 }}>
            {legalDisclaimer} {jurisdictionDisclaimer}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
            © {copyrightYear} SpinBattles. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SpinFooter;
