import React from "react";
import WalletData from "../Layouts/main";
import Home from "../views/mint";

import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Udenar</a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
              <a className="nav-link active" href="/transfer">Galeria</a>
              <a className="nav-link active" href="qr_reader">Qr Reader</a>
            </div>
          </div>
        </div>
      </nav>
      {/* <Transfer /> */}

      {/* <button  onClick={() =>
                  window.open(`/transfer`, "_self")
                } >Galeria</button>
      <button>heyy you</button>  */}
      <WalletData />
      <Home />
    </div>
  );
};

export default Index;
