import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { SPIN_ALLOCATIONS, SITE_CONFIG } from '../../constants/spinTokenData';

const fmt = (n) => n.toLocaleString();

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <Box sx={{ bgcolor: '#13132b', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 2, p: 2 }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{d.name}</Typography>
        <Typography sx={{ color: '#a78bfa', fontSize: '0.85rem' }}>{d.percentage}% — {fmt(d.tokenAmount)} SPIN</Typography>
      </Box>
    );
  }
  return null;
};

const SpinTokenomicsSection = ({ allocations = SPIN_ALLOCATIONS }) => (
  <Box id="tokenomics" className="spin-section-alt" sx={{ py: 10 }}>
    <Container>
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography sx={{ color: '#d946ef', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
          Tokenomics
        </Typography>
        <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
          <span className="spin-gradient-text">SPIN</span> Token Distribution
        </Typography>
        <Typography sx={{ color: '#f59e0b', fontWeight: 800, fontSize: '2rem' }}>
          1,000,000,000 SPIN
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Total Supply</Typography>
      </Box>

      <Grid container spacing={6} alignItems="center">
        {/* Chart */}
        <Grid item xs={12} md={5}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={allocations}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
              >
                {allocations.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        {/* Allocation cards */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            {allocations.map((a, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box
                  data-testid="allocation-card"
                  className="spin-card"
                  sx={{ p: 2.5, borderLeft: `3px solid ${a.color}` }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', mb: 0.5 }}>{a.name}</Typography>
                  <Typography sx={{ color: a.color, fontWeight: 800, fontSize: '1.4rem' }}>{a.percentage}%</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{fmt(a.tokenAmount)} SPIN</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', mt: 0.5 }}>{a.vestingSchedule}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default SpinTokenomicsSection;
