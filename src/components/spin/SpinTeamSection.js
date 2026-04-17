import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SPIN_TEAM } from '../../constants/spinTokenData';

const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const SpinTeamSection = ({ members = SPIN_TEAM }) => (
  <Box id="team" className="spin-section" sx={{ py: 10 }}>
    <Container>
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography sx={{ color: '#d946ef', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
          The Team
        </Typography>
        <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
          Meet the <span className="spin-gradient-text">Builders</span>
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, mx: 'auto' }}>
          A team of gaming and blockchain veterans building the future of play-to-earn.
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {members.map((member, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              data-testid="team-card"
              className="spin-card"
              sx={{ p: 3, textAlign: 'center', height: '100%' }}
            >
              {member.avatar ? (
                <Avatar src={member.avatar} alt={member.name} sx={{ width: 72, height: 72, mx: 'auto', mb: 2 }} />
              ) : (
                <Box
                  sx={{
                    width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 2,
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: '1.3rem',
                  }}
                >
                  {getInitials(member.name)}
                </Box>
              )}
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>{member.name}</Typography>
              <Typography sx={{ color: '#a78bfa', fontSize: '0.8rem', mb: 1.5 }}>{member.role}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.6 }}>{member.bio}</Typography>
              {member.linkedinUrl && (
                <IconButton component="a" href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  size="small" sx={{ mt: 1.5, color: '#06b6d4' }}>
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default SpinTeamSection;
