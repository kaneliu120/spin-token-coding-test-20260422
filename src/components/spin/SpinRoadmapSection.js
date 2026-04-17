import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SPIN_ROADMAP } from '../../constants/spinTokenData';

const statusStyles = {
  completed: { border: '1px solid #06b6d4', badge: { bg: '#06b6d4', label: 'Completed' } },
  active:    { border: '1px solid #7c3aed', badge: { bg: '#7c3aed', label: 'Active' }, glow: '0 0 24px rgba(124,58,237,0.35)' },
  upcoming:  { border: '1px solid rgba(255,255,255,0.1)', badge: { bg: 'rgba(255,255,255,0.1)', label: 'Upcoming' } },
};

const SpinRoadmapSection = ({ phases = SPIN_ROADMAP }) => (
  <Box id="roadmap" className="spin-section" sx={{ py: 10 }}>
    <Container>
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography sx={{ color: '#f59e0b', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
          Roadmap
        </Typography>
        <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
          Building the Future of{' '}
          <span className="spin-gradient-text">Gaming</span>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {[...phases].sort((a, b) => a.phaseNumber - b.phaseNumber).map((phase, i) => {
          const s = statusStyles[phase.status] || statusStyles.upcoming;
          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                data-testid="roadmap-phase"
                sx={{
                  background: '#13132b',
                  border: s.border,
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  boxShadow: s.glow || 'none',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {/* Phase number + badge */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: '0.85rem' }}>
                    Phase {phase.phaseNumber}
                  </Typography>
                  <Box sx={{ bgcolor: s.badge.bg, borderRadius: 10, px: 1.5, py: 0.3 }}>
                    <Typography sx={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
                      {s.badge.label}
                    </Typography>
                  </Box>
                </Box>

                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', mb: 0.5 }}>
                  {phase.title}
                </Typography>
                {phase.quarter && (
                  <Typography sx={{ color: '#f59e0b', fontSize: '0.8rem', mb: 2 }}>{phase.quarter}</Typography>
                )}

                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {phase.milestones.map((m, j) => (
                    <Box component="li" key={j} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', mb: 0.5 }}>
                      {m}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  </Box>
);

export default SpinRoadmapSection;
