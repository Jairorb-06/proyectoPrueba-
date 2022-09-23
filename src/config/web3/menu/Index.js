import React from "react";
import WalletData from "../../../Layouts/main";
import Home from "../../../views/home";
import Transfer from "../../../views/Tokens/Transfer";

const Index = () => {
  return (
    <>
      <Transfer />
      <WalletData />

      <Home />
    </>
  );
};

export default Index;
