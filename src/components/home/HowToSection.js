import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Grid from '@mui/material/Grid';
import StepContent from '@mui/material/StepContent';
import StepButton from '@mui/material/StepButton';
import Link from '@mui/material/Link';

const step2Description = (
  <span>
    $SPIN is currently positioned around the BNB Chain flow. MetaMask is a third-party browser wallet that works well for BSC-compatible participation. On Google Chrome, visit <Link href="https://metamask.io" underline="none" target="_blank" rel="noreferrer">metamask.io</Link> to download the extension and set up a wallet. On mobile, use MetaMask&apos;s app for iPhone or Android.
  </span>
)

const steps = [
  {
    label: 'Choose your network',
    description: '$SPIN is currently aligned to the BNB Chain flow. Choose the supported network in your wallet before entering the pre-sale page.',
  },
  {
    label: 'Create a MetaMask Wallet',
    description: step2Description,
  },
  {
    label: 'Send BEP20 $BNB to MetaMask',
    description: 'Acquire $BNB through MetaMask itself or transfer it to your MetaMask wallet address from another wallet (e.g. Coinbase or Binance).',
  },
  {
    label: 'Click On Pre-Sale',
    description: 'Open the SPIN pre-sale page and review the current token sale terms before proceeding with your wallet connection.',
  },
  {
    label: 'Swap into $SPIN',
    description: 'Click Connect Wallet, enter the amount you want to use for the purchase, review the sale details, and then confirm the swap.',
  },
  {
    label: 'Claim $SPIN',
    description: 'All $SPIN purchased can be claimed at the pre-sale page after the end of the vesting period.',
  },
];

const HowToSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      id="getSPIN"
      sx={{py: 7, borderTop: 1, borderBottom: 1, borderColor: "grey.100" }}
    >
      <Container>
        <Typography 
          variant="body1" 
          color="primary.main" 
          sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}
        > 
          Let's Get started
        </Typography>
        <Typography 
          variant="h4" 
          component="div" 
          color="text.primary"
          sx={{ fontWeight: 'bold', pb: 6, textAlign: 'center' }}
        >
          How to get $SPIN
        </Typography>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Stepper activeStep={activeStep} orientation="vertical" nonLinear variant="dots">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <Typography 
                      variant="h6"
                      component="div"
                    >
                      {step.label}
                    </Typography>
                  </StepButton>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          disableElevation
                          onClick={index === steps.length - 1 ? handleReset : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Again' : 'Got It'}
                        </Button>
                        <Button
                          color="inherit"
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          previous step
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
 
export default HowToSection;
