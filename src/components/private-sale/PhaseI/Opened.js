import { useState, useEffect, Fragment } from 'react';
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PRESALE_ABI from "../../../contracts/presale.json";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'; 
import Alert from '../../ui/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import moment from 'moment';
import { useAppAuth } from '../../../providers/AuthProvider/AuthProvider';

const PresaleContractAddress = [
  "",
  "0xA5c8E773B9887EEa7a42C7Efe8a997e31219F456"
];


// 0: ropsten, 1: bsc testnet
let chainindex = 0; 

// const netChainId = [
//   0x1,  //Eth mainnet
//   0x38  //BSC mainnet
// ];

const netChainId = [
  0x3,  //Ropsten
  0x38  //BSC testnet 2A kovan
];

const CardLabel = ({text}) => {
  return (<Typography 
    color="text.secondary" 
    sx={{ fontWeight: 500}}
    variant="body1" 
    display="block" 
  >
    {text}
  </Typography>)
}

const CardValue = ({text}) => {
  return (
    <Typography 
      color="text.primary"
      sx={{ fontWeight: 500, textAlign: "right"}}
    >
      {text}
    </Typography>
  )
}

const Opened = ({ setActiveStep }) => {
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [tokenInfo, setTokenInfo] = useState([])
  const [presaleInfo, setPresaleInfo] = useState([])
  const [buyerInfo, setBuyerInfo] = useState([])
  const [status, setStatus] = useState([])
  const [presaleState, setPresaleState] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const {account, library} = useWeb3React();
  const { isAccessReady, isGmailConnected, gmail } = useAppAuth();

  useEffect(() => {
    // Update step based on wallet connection and network
    if (!account || !library) {
      setActiveStep(-1); // No wallet connected
    } else if (library.provider && (
      parseInt(library.provider.chainId) === netChainId[0] || 
      parseInt(library.provider.chainId) === netChainId[1]
    )) {
      setActiveStep(1); // Wallet connected and network chosen
    } else if (library.provider) {
      setActiveStep(0); // Wallet connected but wrong network
    }
  }, [account, library, setActiveStep]);

  useEffect(() => {
    // Update step when amount is entered
    if (account && library && amountToBuy > 0) {
      setActiveStep(2); // Amount entered
    }
  }, [amountToBuy, account, library, setActiveStep]);

  useEffect(() => {
    if(!library) {
      Init()
      return;
    }

    if(!library.provider) {
      Init()
      return
    }

    //console.log(parseInt(library.provider.chainId), "net chain id");
    if(parseInt(library.provider.chainId) === netChainId[0]) {
      chainindex = 0
      getInfo()
    } else if(parseInt(library.provider.chainId) === netChainId[1]) {
      chainindex = 1
      getInfo()
    } else {
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
    }   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

  const Init = () => {
    setAmountToBuy(1)
    setTokenInfo([])
    setPresaleInfo([])
    setStatus([])
    setBuyerInfo([])
    setPresaleState('')
  }

  const getContract = (abi, address, signer = null) => {
    const signerOrProvider = signer
    return new ethers.Contract(address, abi, signerOrProvider)
  }

  const getInfo = async () => {

    let presalecontract;

    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();

    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer)
   
    let chainSuffix = ""
    if(parseInt(library.provider.chainId) === netChainId[0]) {
      chainSuffix = "ETH"
    } else {
      chainSuffix = "BNB"
    }


    let presaleinfo;
    try {
      presaleinfo = await presalecontract.presale_info();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Presale Information Error')
      return null;
    }

    let tokenrate;
    try {
      tokenrate = presaleinfo.token_rate;
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get token rate Information Error')
      return null;
    }


    const soft_starttime = `${moment.utc(parseInt(presaleinfo.presale_start)*1000).format('Do of MMM, h A')} UTC`
    const soft_endtime = `${moment.utc(parseInt(presaleinfo.presale_end)*1000).format('Do of MMM, h A')} UTC`


    setPresaleInfo([
      {id: "Token Rate:", val: 1/tokenrate + " BNB"},
      {id: "Softcap:", val: ethers.utils.formatUnits(presaleinfo.softcap, 18).toString() + " " + chainSuffix},
      {id: "Hardcap:", val: ethers.utils.formatUnits(presaleinfo.hardcap, 18).toString() + " " + chainSuffix},
      {id: "Buy min:", val: ethers.utils.formatUnits(presaleinfo.raise_min, 18).toString() + " " + chainSuffix},
      {id: "Buy max:", val: ethers.utils.formatUnits(presaleinfo.raise_max, 18).toString() + " " + chainSuffix},
      {id: "Soft Presale Start:", val: soft_starttime},
      {id: "Soft Presale End:", val: soft_endtime},
    ])

    let tokeninfoarr;
    try {
      tokeninfoarr = await presalecontract.tokeninfo();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Token Information Error')
      return null;
    }
    
    let sale_supply = ethers.utils.formatUnits(tokeninfoarr.totalsupply, tokeninfoarr.decimal) / 100 * 10;
    setTokenInfo([
      {id:"Token Name:", val:"SPIN"},
      {id:"Token Symbol:", val:"SPIN"},
      {id:"Token Decimal:", val:parseInt(tokeninfoarr.decimal)},
      {id: "Address:", val: presaleinfo.sale_token},
      {id:"Sale Supply:", val: sale_supply + " SPIN"},
    ])
    
    let status;
    try {
      status = await presalecontract.status();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Status Information Error')
      return null;
    }

    setStatus([
      {id: "Raised Amount", val: ethers.utils.formatUnits(status.raised_amount, 18).toString() + " " + chainSuffix},
      {id: "Sold Amount", val: ethers.utils.formatUnits(status.sold_amount, tokeninfoarr.decimal).toString() + " SPIN"}
    ])
  
    try{
        const buyerInfo = await presalecontract.buyers(account);
        setBuyerInfo(
          [
            { id: "Invested", val: ethers.utils.formatUnits(buyerInfo.base, 18).toString() + " " + chainSuffix },
            { id: "SPIN Amount", val: ethers.utils.formatUnits(buyerInfo.sale, 18).toString() + " SPIN"},
          ]
        )
    }
    catch (error)
    {
      setOpenAlert(true)
      setAlertMsg('Get Buyers Information Error')
      return null;
    }
    
    const state = await getPresaleStatus(presalecontract);
    setPresaleState(parseInt(state));
  }
  
  const getPresaleStatus = async (presalecontract) => {

    let presalestate;
    try {
      presalestate = await presalecontract.presaleStatus();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Status Error')
      return null;
    }

    return presalestate
  }

  const Deposit = async (amount) => {

    let presalecontract;
    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();
    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer)
    if(
      parseInt(library.provider.chainId) !== netChainId[0]
      && parseInt(library.provider.chainId) !== netChainId[1]
    ) {  
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
      return
    }

    if ((!amount || amount <= 0)) {
      setOpenAlert(true)
      setAlertMsg('Please enter a valid amount')
      return
    }

    let overrid = {
      value: ethers.utils.parseUnits(amount.toString(), 18),
    }

    try {
      await presalecontract.userDeposit(overrid)
      // const tx = await presalecontract.userDeposit(overrid)
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true)
      setAlertMsg('Deposit done successfully')
      setActiveStep(3) // Mark "Click Buy" as complete
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Deposit failed')
      return;
    }
  }

  const Withdraw = async () => {
    let presalecontract;
    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();
    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer)
    if(
      parseInt(library.provider.chainId) !== netChainId[0]
      && parseInt(library.provider.chainId) !== netChainId[1]
    ) {  
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
      return
    }

    try {
      await presalecontract.userWithdrawBaseTokens()
      // const tx = await presalecontract.base_withdraw()
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true)
      setAlertMsg('Withdraw done successfully')
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Withdraw failed')
      return;
    }
  }

  const Claim = async () => {

    let presalecontract;
    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();
    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer)
    if(
      parseInt(library.provider.chainId) !== netChainId[0] 
      && parseInt(library.provider.chainId) !== netChainId[1]
    ) {
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
      return
    }

    try {
      await presalecontract.userWithdrawTokens()

      // const tx = await presalecontract.token_withdraw()
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)

      setOpenAlert(true)
      setAlertMsg('Claim done successfully')
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Claim failed')
      return;
    }
  }

  const getStatusString = () => {
    let label;
    switch(presaleState) {
      case 1:
        label = 'Sale is Active'
        break;
      case 2:
        label = 'Sale is Successful'
        break;
      case 3:
        label = 'Sale is failed'
        break;
      default:
        label = 'Sale is not Active'
    }

    return label;
  }

  const actionButton = () => {
    let label;
    switch(presaleState) {
      case 1:
        label = 'Buy'
        break;
      case 2:
        label = 'Claim'
        break;
      case 3:
        label = 'Withdraw'
        break;
      default:
        return null
    }

    const execFunc = async () => {
      if (!isAccessReady) {
        setOpenAlert(true)
        setAlertMsg('Please sign up or log in with a Gmail account and connect your wallet before buying')
        return;
      }
      switch(presaleState) {
        case 1:
          label = 'Buy'
          Deposit(amountToBuy)
          break;
        case 2:
          label = 'Claim'
          Claim();
          break;
        case 3:
          label = 'Withdraw'
          Withdraw()
          break;
        default:
          return null
      }
    }

    return (
      <Button
        fullWidth
        onClick={
          () => execFunc()
        }
        >
        {label}
      </Button>
    )
  }

  const handleStateChipColor = (state) => {
    switch(state) {
      case 1:
      case 2:
        return 'success'
      case 3:
        return 'error'
      default:
        return 'default'
    }
  }

  const handleSelectedChain = () => {
    try {
      switch(parseInt(library.provider.chainId)) {
        case netChainId[1]:
          return '$BNB'
        case netChainId[0]:
          return '$ETH'
        default:
          return 'Unknown'
      }
    } catch(e) {
      return 'Unrecognized chain'
    }
  }

  return (
    <Fragment>
      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        msg={alertMsg}
      />
      {presaleState === 1 && (
              <Typography 
              color="text.primary"
              sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
              variant="h6"
            >
              Private-sale is started.
          </Typography>
      )}
      {presaleState === 2 && (
              <Typography 
              color="text.primary"
              sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
              variant="h6"
            >
              Private-sale is finished with successful.
          </Typography>
      )}
       {presaleState === 3 && (
              <Typography 
              color="text.primary"
              sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
              variant="h6"
            >
              Private-sale is finished with failure.
          </Typography>
      )}

      <Grid container spacing={2} justifyContent="center" className="fadeInUp">
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{
              borderRadius: 10, 
              p: 1,
              boxShadow: '0 2px 16px rgb(53 69 89 / 5%)'
            }}
          > 
            <CardContent>
              <Divider light textAlign="left"><Chip label="Token Information" /></Divider>
              {tokenInfo.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              <Divider light textAlign="left" sx={{mt: 3}}><Chip label="Private-sale Information" /></Divider>
              {presaleInfo.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              <Divider light textAlign="left" sx={{mt: 3}}><Chip label="Private-sale Status" /></Divider>
              {status.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
               <Divider light textAlign="left" sx={{mt: 3}}><Chip label="Buyer Information" /></Divider>
              {buyerInfo.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              {presaleState && (
                (<Stack direction="row" justifyContent="flex-end">
                  <Chip
                    label={getStatusString()} 
                    color={handleStateChipColor(presaleState)} 
                    sx={{letterSpacing: 1, fontWeight: 500, mt: 2}}
                  />
                </Stack>)
              )}
              {presaleState === 1 && (
                <Fragment>
                  {!isGmailConnected && (
                    <Typography variant='caption' display="block" sx={{fontWeight: 700, mb: 1.5, color: 'warning.main'}}>
                      Gmail sign-in is required before the buy action is enabled.
                    </Typography>
                  )}
                  {isGmailConnected && (
                    <Typography variant='caption' display="block" sx={{fontWeight: 700, mb: 1.5, color: 'success.main'}}>
                      Gmail connected: {gmail}
                    </Typography>
                  )}
                  <Typography variant='caption' display="block" sx={{fontWeight: 700, mb: 1}}>Buy SPIN Token</Typography>
                  <TextField
                    type="number"
                    id="amountToBuy"
                    label="Amount to Buy"
                    variant="standard"
                    value={amountToBuy}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setAmountToBuy(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{handleSelectedChain()}</InputAdornment>,
                      autoComplete: "off"
                    }}
                    fullWidth
                    sx={{mb: 1}}
                  />
                </Fragment>
              )}
            </CardContent>
            <CardActions>
              {actionButton()}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
 
export default Opened;
