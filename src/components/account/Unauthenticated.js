import { Fragment } from "react";
import Button from '@mui/material/Button';
import WalletIcon from '../ui/icons/Wallet';
import { Link as RouterLink } from "react-router-dom";

const Unauthenticated = () => {
  return (
    <Fragment>
      <Button
        component={RouterLink}
        to="/auth"
        variant="contained"
        disableElevation
        startIcon={<WalletIcon />}
        sx={{ boxShadow: 'rgb(0 0 0 / 8%) 0px 8px 28px', borderRadius: 5 }}
      >
        Authenticate
      </Button>
    </Fragment>
  );
};

export default Unauthenticated;
