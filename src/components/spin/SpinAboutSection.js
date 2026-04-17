import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const features = [
  { icon: '🎮', title: '3D Multiplayer Gaming', desc: 'SpinBattles is a next-generation 3D multiplayer gaming platform built for competitive and casual players alike.' },
  { icon: '💎', title: 'Digital Ownership', desc: 'Own your in-game assets as NFTs. Trade, upgrade, and carry your items across the ecosystem.' },
  { icon: '🔗', title: 'Powered by SPIN', desc: 'SPIN is the native utility token connecting players, rewards, and the broader gaming economy.' },
];

const SpinAboutSection = () => (
  <Box id="about" className="spin-section-alt" sx={{ py: 10 }}>
    <Container>
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography sx={{ color: '#a78bfa', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
          About SpinBattles
        </Typography>
        <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
          A New Era of{' '}
          <span className="spin-gradient-text">Gaming & Ownership</span>
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, mx: 'auto', fontSize: '1rem' }}>
          SpinBattles combines competitive 3D gaming with blockchain-powered digital ownership — giving players real value for their time and skill.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {features.map((f, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box className="spin-card spin-fade-in-up" sx={{ p: 4, height: '100%' }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>{f.icon}</Typography>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>{f.title}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{f.desc}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default SpinAboutSection;
