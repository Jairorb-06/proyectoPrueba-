import React from "react";
// import { Route } from 'react-router-dom';
import WalletData from "./Layouts/main";
import Home from "./views/mint";
import Transfer from "./views/Tokens/Transfer";
// import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NFTs from "./views/Tokens/NFTs";
import Index from "./menu/Index";
import Sell from "./views/mint/Sell";
 import ImageProvider from "./providers/ImageProvider";
import ImgProvider from "./providers/ImgProvider";
import QrRead from "./QrReader/QrReader";
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
    <ImgProvider>
    <ImageProvider>
      <Router>
        <Switch>
          {/* <Route path="/" exact component={Transfer} /> */}
          <Route path="/NFTs" exact component={NFTs} />
          <Route path="/Transfer" exact component={Transfer} />
          <Route path="/NFTs/:tokenId" exact component={NFTs} />
          <Route path="/Venta/:index" exact component={Sell} />
          <Route path="/" exact component={Index} />
          <Route path="/qr_reader" exact component={QrRead} />
        </Switch>
      </Router>
      </ImageProvider>
    </ImgProvider>
    </>
    /*  <Home></Home> */
    /* <Route path="/" exact component={Home}/> */
    /* </WalletData> */
  );
}

export default App;
