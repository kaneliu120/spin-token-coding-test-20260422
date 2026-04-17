import { Fragment } from "react";
import Button from '@mui/material/Button';
import WalletIcon from '../ui/icons/Wallet';
import { useWalletConnector, setNet } from "./WalletConnector.js";

const Unauthenticated = () => {
  const { loginMetamask } = useWalletConnector();

  const handleConnect = async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    // Initialize BNB Chain connector then trigger injected wallet
    setNet(1);
    loginMetamask();
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        disableElevation
        onClick={handleConnect}
        startIcon={<WalletIcon />}
        sx={{ boxShadow: 'rgb(0 0 0 / 8%) 0px 8px 28px', borderRadius: 5 }}
      >
        Wallet Connect
      </Button>
    </Fragment>
  );
};

export default Unauthenticated;
