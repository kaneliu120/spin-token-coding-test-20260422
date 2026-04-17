import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SPIN_FAQ } from '../../constants/spinTokenData';

const SpinFAQSection = ({ items = SPIN_FAQ }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <Box id="faq" className="spin-section-alt" sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography sx={{ color: '#f59e0b', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}>
            FAQ
          </Typography>
          <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: '#fff', mb: 2 }}>
            Frequently Asked <span className="spin-gradient-text">Questions</span>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Box
                key={i}
                className="spin-card"
                sx={{ overflow: 'hidden', borderColor: isOpen ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)' }}
              >
                <Box
                  component="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  sx={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    p: 3, textAlign: 'left',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', pr: 2 }}>
                    {item.question}
                  </Typography>
                  <Typography sx={{ color: '#7c3aed', fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    +
                  </Typography>
                </Box>

                <Box
                  aria-hidden={!isOpen}
                  sx={{
                    maxHeight: isOpen ? 400 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.7, px: 3, pb: 3 }}>
                    {item.answer}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default SpinFAQSection;
