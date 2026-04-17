import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SPIN_UTILITIES } from '../../constants/spinTokenData';

const SpinUtilitySection = ({ utilities = SPIN_UTILITIES }) => (
  <Box id="utility" className="spin-section" sx={{ py: 10 }}>
    <Container>
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography sx={{ color: '#06b6d4', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
          Token Utility
        </Typography>
        <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
          What You Can Do With{' '}
          <span className="spin-gradient-text">SPIN</span>
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, mx: 'auto' }}>
          SPIN powers every interaction inside the SpinBattles ecosystem — from gameplay to governance.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {utilities.map((u, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box
              data-testid="utility-card"
              className="spin-card"
              sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}
            >
              <Typography sx={{ fontSize: '2rem' }}>{u.icon}</Typography>
              <Typography data-testid="utility-title" sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                {u.title}
              </Typography>
              <Typography data-testid="utility-description" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {u.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default SpinUtilitySection;
