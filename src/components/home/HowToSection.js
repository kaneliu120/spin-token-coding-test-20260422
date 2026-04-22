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
    $SPIN is currently structured around the ERC-20 flow. MetaMask is a widely used wallet for Ethereum-compatible participation. On Google Chrome, visit <Link href="https://metamask.io" underline="none" target="_blank" rel="noreferrer">metamask.io</Link> to download the extension and set up a wallet. On mobile, use MetaMask&apos;s app for iPhone or Android.
  </span>
)

const steps = [
  {
    label: 'Choose your network',
    description: '$SPIN is currently aligned to the ERC-20 flow. Choose the supported Ethereum-compatible network in your wallet before entering the private-sale page.',
  },
  {
    label: 'Create a MetaMask Wallet',
    description: step2Description,
  },
  {
    label: 'Prepare ETH, USDT, or card checkout',
    description: 'Fund your wallet with ETH or USDT, or prepare to use the available credit-card checkout option during the private sale.',
  },
  {
    label: 'Open the Private Sale',
    description: 'Open the SPIN private-sale page and review the confirmed token price, supported payment methods, and purchase limits before proceeding.',
  },
  {
    label: 'Swap into $SPIN',
    description: 'Connect your wallet, choose your payment method, enter an amount between $100 and $10,000, review the sale details, and then confirm the purchase.',
  },
  {
    label: 'Claim $SPIN',
    description: 'Claim and vesting timing is currently TBA. Buyers should watch the official sale updates for the final claim schedule.',
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
