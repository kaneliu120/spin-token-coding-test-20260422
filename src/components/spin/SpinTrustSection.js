import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SITE_CONFIG } from '../../constants/spinTokenData';

const SpinTrustSection = () => {
  const [copied, setCopied] = useState(false);
  const { contractAddress, blockchain, audit, securityMeasures, legalDisclaimer } = SITE_CONFIG;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trustItems = [
    { icon: '🏢', title: 'Company Background', desc: 'SpinBattles was founded by a team of gaming and blockchain veterans with a shared vision: to build the most rewarding 3D gaming ecosystem on-chain.' },
    { icon: '🔍', title: 'Smart Contract Audit', desc: audit.status === 'completed' ? `Audited by ${audit.firmName}.` : 'Smart contract audit is currently in progress. Results will be published before token launch.' },
    { icon: '📋', title: 'KYC & Compliance', desc: 'Core team members have completed KYC verification. Documentation available to institutional partners upon request.' },
    { icon: '⚖️', title: 'Legal & Compliance', desc: legalDisclaimer },
  ];

  return (
    <Box id="trust" className="spin-section-alt" sx={{ py: 10 }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography sx={{ color: '#06b6d4', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
            Trust & Verification
          </Typography>
          <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
            Built on <span className="spin-gradient-text">Transparency</span>
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {trustItems.map((item, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box className="spin-card" sx={{ p: 3, height: '100%' }}>
                <Typography sx={{ fontSize: '1.8rem', mb: 1 }}>{item.icon}</Typography>
                <Typography sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</Typography>
                {item.title === 'Smart Contract Audit' && audit.reportUrl && (
                  <Button component="a" href={audit.reportUrl} target="_blank" rel="noopener noreferrer"
                    size="small" sx={{ mt: 1, color: '#06b6d4', p: 0, textTransform: 'none' }}>
                    View Report →
                  </Button>
                )}
                {item.title === 'Smart Contract Audit' && !audit.reportUrl && (
                  <Box sx={{ mt: 1, display: 'inline-block', bgcolor: 'rgba(245,158,11,0.15)', border: '1px solid #f59e0b', borderRadius: 1, px: 1.5, py: 0.3 }}>
                    <Typography sx={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: 700 }}>Audit Pending</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Contract + Chain + Security */}
        <Box className="spin-card" sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Blockchain</Typography>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{blockchain}</Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', mt: 3, mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Contract Address</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography sx={{ color: contractAddress ? '#a78bfa' : 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  {contractAddress ?? 'TBA — will be published at launch'}
                </Typography>
                {contractAddress && (
                  <CopyToClipboard text={contractAddress} onCopy={handleCopy}>
                    <Button size="small" variant="outlined" sx={{ borderColor: 'rgba(124,58,237,0.4)', color: copied ? '#06b6d4' : '#a78bfa', minWidth: 80, fontSize: '0.75rem' }}>
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </CopyToClipboard>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', mb: 1.5, textTransform: 'uppercase', letterSpacing: 1 }}>Security Measures</Typography>
              {securityMeasures.map((m, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#06b6d4', flexShrink: 0 }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{m}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SpinTrustSection;
