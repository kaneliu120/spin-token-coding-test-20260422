import { Fragment, useState } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PhaseI from '../../components/pre-sale/PhaseI/Renderer';
import PreSaleSteps from 'components/pre-sale/PreSaleSteps';
//import Ended from './Ended';

export default function PreSale() {
  const [activeStep, setActiveStep] = useState(-1);

  //return <Ended />

  return (
    <Fragment>
      <Container>
        <Box sx={{mb: 4}}>
          <Typography 
            color="primary.main" 
            variant="h4" 
            sx={{ fontWeight: 'bold', mb: 1}} 
            component="div"
          >
            SPIN Token Pre-sale
          </Typography>
          <Typography variant="body1" color="text.secondary">
            During the pre-sale, you will have the option to buy $SPIN. All $SPIN purchased can be claimed after the end of the vesting period.
          </Typography>
        </Box>
      </Container>
      <Box 
        sx={{
          bgcolor: "neutral.main", 
          py: 7, 
          borderTop: 1, 
          borderBottom: 1, 
          borderColor: "grey.100",
          mb: 4
        }}
      >
        <Container>
          {/* <Typography 
            color="text.primary"
            sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
            variant="h4"
          >
            I C O
          </Typography> */}
          <Typography 
            variant="body1" color="text.secondary"
            sx={{ mb: 2, textAlign: 'center', maxWidth: 600, mx: 'auto' }}
          >
            Grab your SPIN token now and enjoy vast benefits as part of the SpinBattles gaming ecosystem.
          </Typography>
          <PreSaleSteps activeStep={activeStep} />
          <PhaseI setActiveStep={setActiveStep} />
        </Container>
      </Box>
    </Fragment>
  )
}
