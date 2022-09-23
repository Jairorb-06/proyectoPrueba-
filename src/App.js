import React from "react";
// import { Route } from 'react-router-dom';
import WalletData from "./Layouts/main";
import Home from "./views/home";
import Transfer from "./views/Tokens/Transfer";
// import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NFTs from "./views/Tokens/NFTs";
import Index from "./config/web3/menu/Index";
//import WalletData from "./wallet-data";

/* function Boton(props){
  return (
    <button onClick={props.nombre}>
      Conectar wallet
    </button>
  )
} */

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route path="/" exact component={Transfer} /> */}
          <Route path="/NFTs" exact component={NFTs} />
          <Route path="/" exact component={Index} />
          {/* <Route path="/" exact component={Home} /> */}
        </Switch>
      </Router>
      
    </>
    /*  <Home></Home> */
    /* <Route path="/" exact component={Home}/> */
    /* </WalletData> */
  );
}

export default App;
