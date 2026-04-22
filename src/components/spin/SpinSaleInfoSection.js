import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SPIN_SALE_INFO } from '../../constants/spinTokenData';

const SpinSaleInfoSection = () => (
  <Box
    id="sale-info"
    sx={{
      py: { xs: 8, md: 10 },
      background:
        'radial-gradient(circle at top, rgba(124,58,237,0.18), transparent 40%)',
    }}
  >
    <Container>
      <Box
        className="spin-card"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, sm: 4, md: 5 },
          border: '1px solid rgba(124,58,237,0.28)',
          background:
            'linear-gradient(135deg, rgba(19,19,43,0.96) 0%, rgba(10,10,15,0.92) 55%, rgba(12,18,35,0.96) 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.38)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.22), transparent 68%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -120,
            left: -60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.14), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Grid container spacing={{ xs: 4, md: 5 }} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                color: '#a78bfa',
                fontWeight: 700,
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontSize: '0.82rem',
              }}
            >
              {SPIN_SALE_INFO.eyebrow}
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: '#fff',
                fontWeight: 800,
                lineHeight: 1.15,
                fontSize: { xs: '1.9rem', md: '2.5rem' },
                mb: 2,
              }}
            >
              {SPIN_SALE_INFO.title.split('SPIN').map((part, index, array) => (
                <Box component="span" key={`${part}-${index}`}>
                  {part}
                  {index < array.length - 1 ? (
                    <span className="spin-gradient-text">SPIN</span>
                  ) : null}
                </Box>
              ))}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.64)',
                lineHeight: 1.7,
                fontSize: '0.98rem',
                maxWidth: 440,
                mb: 3,
              }}
            >
              {SPIN_SALE_INFO.summary}
            </Typography>

            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid rgba(245,158,11,0.22)',
                background: 'linear-gradient(180deg, rgba(245,158,11,0.14), rgba(245,158,11,0.04))',
                mb: 2.5,
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  fontSize: '0.76rem',
                  mb: 1,
                }}
              >
                Token Price
              </Typography>
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                {SPIN_SALE_INFO.tokenPrice.value}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.92rem' }}>
                {SPIN_SALE_INFO.tokenPrice.helper}
              </Typography>
            </Box>

            <Chip
              label={SPIN_SALE_INFO.status.label}
              sx={{
                height: 'auto',
                py: 1.1,
                px: 1.4,
                borderRadius: 999,
                bgcolor: 'rgba(124,58,237,0.16)',
                border: '1px solid rgba(124,58,237,0.35)',
                color: '#d8b4fe',
                fontWeight: 700,
                '& .MuiChip-label': {
                  px: 0,
                  whiteSpace: 'normal',
                },
              }}
            />
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.84rem',
                lineHeight: 1.6,
                mt: 1.5,
                maxWidth: 420,
              }}
            >
              {SPIN_SALE_INFO.status.note}
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {SPIN_SALE_INFO.metrics.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Box
                    sx={{
                      height: '100%',
                      minHeight: 168,
                      p: 2.5,
                      borderRadius: 3,
                      border: `1px solid ${item.accent}33`,
                      background: 'rgba(255,255,255,0.02)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 4,
                        borderRadius: 999,
                        bgcolor: item.accent,
                        mb: 2,
                      }}
                    />
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        fontSize: '0.76rem',
                        mb: 1.5,
                      }}
                    >
                      {item.label}
                    </Typography>

                    {Array.isArray(item.value) ? (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {item.value.map((method) => (
                          <Chip
                            key={method}
                            label={method}
                            sx={{
                              bgcolor: 'rgba(6,182,212,0.12)',
                              border: '1px solid rgba(6,182,212,0.32)',
                              color: '#67e8f9',
                              fontWeight: 700,
                            }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Box>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.15rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.value}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.48)',
                            fontSize: '0.84rem',
                            lineHeight: 1.55,
                            mt: 1,
                          }}
                        >
                          {item.helper}
                        </Typography>
                      </Box>
                    )}

                    {Array.isArray(item.value) ? (
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.48)',
                          fontSize: '0.84rem',
                          lineHeight: 1.55,
                          mt: 1.25,
                        }}
                      >
                        {item.helper}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default SpinSaleInfoSection;
