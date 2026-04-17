import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import ERC20Balance from "components/ERC20Balance";
import Home from "containers/home";
import About from "containers/about";
import Gallery from "containers/gallery";
import Transactions from "containers/transactions";
import NFTs from "containers/nfts";
import "antd/dist/antd.css";
import Ramper from "./components/Ramper";
import Footer from './components/layout/Footer';
import MainNavigation from "components/layout/Header/MainNavigation";
import Swap from "containers/swap";
import Presale from "containers/pre-sale";
import PrivateSale from "containers/private-sale";
import Mint from "containers/mint";
import Stake from "containers/stake";
import SpinTokenPage from "containers/spin";

const AppLayout = () => {
  const { library, account } = useWeb3React();
  const { pathname } = useLocation();
  const isSpinPage = pathname === '/spin' || pathname.startsWith('/spin');

  useEffect(() => {
    if (library) localStorage.setItem("connected", true);
  }, [library, account]);

  return (
    <>
      <MainNavigation />
      <main style={{ marginTop: isSpinPage ? 0 : 90, marginBottom: isSpinPage ? 0 : 90 }}>
        <Switch>
          <Route exact path="/" ><Redirect to="/spin" /></Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/swap" component={Swap} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/erc20balance" component={ERC20Balance} />
          <Route exact path="/onramp" component={Ramper} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/nfts" component={NFTs} />
          <Route exact path="/pre-sale" component={Presale} />
          <Route exact path="/private-sale" component={PrivateSale} />
          <Route exact path="/mint" component={Mint} />
          <Route exact path="/stake" component={Stake} />
          <Route exact path="/spin" component={SpinTokenPage} />
          <Route exact path="/nonauthenticated">
            <>Please login using the "Authenticate" button</>
          </Route>
        </Switch>
      </main>
      {!isSpinPage && <Footer />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
