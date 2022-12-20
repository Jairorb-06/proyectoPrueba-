import React from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useUdenarToken from "../../hooks/useUdenarToken";
import { useUdenarTokenData } from "../../hooks/useUdenarTokenData";
import { useParams } from "react-router-dom";

import { connector } from "../../config/web3";

import QRCode from "react-qr-code";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import ModalReg from "../../componets/ModalReg";
import { useImgContext } from "../../providers/ImgProvider";
import { searchRegister, searchId } from '../../config/firebase/api'

const NFTs = () => {
  const { active, activate, account, library } = useWeb3React();

  const [maxSupply, setMaxSupply] = useState();
  const [transfering, setTransfering] = useState(false);
  const [cuentaTransfer, setCuentaTransfer] = useState("");
  const [tokenStock, setTokenStock] = useState();

  //const owner = "0xD73379c6FadD11e7b41927C53996BAd1Cc8f2640";
  // 0x28B958E9Af420ef110De857628DFA389048d7Fe0
  //const tokenId = 0;

  const udenarToken = useUdenarToken();

  const getTokensData = useCallback(async () => {
    if (udenarToken) {
      const totalSupply = await udenarToken.methods.totalSupply().call();
      //  inicio cálculo de Platzi punks restantes
      const maxSupply = await udenarToken.methods.maxSupply().call();
      setMaxSupply(maxSupply);
      setTokenStock(maxSupply - totalSupply);
      //  fin cálculo de Platzi punks restantes
    }
  }, [udenarToken]);

  useEffect(() => {
    getTokensData();
  }, [getTokensData]);

  const { tokenId } = useParams();

  const { loading, NFTs, update } = useUdenarTokenData(tokenId);

  const Tranfer = () => {
    setTransfering(true);
    const isAddress = library.utils.isAddress(cuentaTransfer);

    if (!isAddress) {
      alert("Dirección Invalida");
      setTransfering(false);
    } else {
      udenarToken.methods
        .safeTransferFrom(NFTs.owner, cuentaTransfer, tokenId)
        .send({
          from: account,
          // value: 10000000000000000,
        })
        .on("error", (error) => {
          setTransfering(false);
          alert("transacción fallida", error);
        })
        .on("transactionHash", (txHash) => {
          alert(`Transacción enviada txHash: ${txHash}`);
        })
        .on("receipt", () => {
          setTransfering(false);
          alert(`Exito! El NFT ahora pertence a: ${cuentaTransfer}`);
        });
      update();
    }
  };

  const onChangeInput = (event) => {
    setCuentaTransfer(event.target.value);
  };

  // mantener conexión cuando se recargue pagina

  const connect = useCallback(() => {
    activate(connector); // crea la instancia de web3 con el conector y queda listo para que library de web3 la utilice
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect(); // hace que se conecte en automatico
  }, [connect]); // localStorage biene del navegador

  /* atributos.forEach(function(elemento, indice){
      console.log(elemento, indice)
    }) */
  /* 
frutas.forEach(function(elemento, indice, array) {
    console.log(elemento, indice);
})
     */
  //  console.log(`Estso son los atributos ${atributos.length}`)

/*   const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
 */
  const [openModal, setOpenModal] = useState(false);

   const [getQr, setGenQr]= useState(false);
  // const [idToken, setIdToken] = useState();


  
  const [ registerId , setRegisterId] = useState('')
  const [searchRegis, setSearchRegis]=useState();
  const abrirModal = () => {
    setOpenModal(!openModal);
    // setIdToken(tokenId);
    // this.setState({openModal: !state.openModal});
  };

     searchRegister(tokenId).then((result)=>{
     setSearchRegis(result)})


  // const searchRegist = false;

  if (!active) return "Conecta tu wallet!";

  //{registerId}
  //{account}
  //{tokenId}
  return (
    <div className="container">
      <ModalReg
        tokenId={tokenId}
        account={account} 
        estado={openModal} 
        cambiarEstado={setOpenModal} 
        setGenQr = {setGenQr}
        setRegisterId={setRegisterId}
      />
      <p>{account}</p>
      <p>maxSupply: {maxSupply}</p>

      <p>dueño: {NFTs.owner}</p>
      <p>TokenId: {NFTs.tokenId}</p>
      {/* <p> TokenURI: {NFTs.tokenURI}</p> */}
      <p>
        {tokenStock > 0
          ? `Quedan ${tokenStock} NFT´s por mintear!`
          : `Se agotaron los NFT´s :(`}
      </p>

      <div className="row">
        <div className="col-md-5">
          <img src={NFTs.image} height={250} width={250} alt="NFT´s" />
        </div>
        <div className="col-md-4 offset-md">
        {searchRegis ? (
        <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        /* {`TokenId: ${idToken} \n Cuenta: ${account}`} */
         value={`TokenId: ${tokenId} \n Cuenta: ${account}`}
        viewBox={`0 0 256 256`}
        />
        ):(
          <button
          className="btn btn-outline-success"
          onClick={() => abrirModal()}
        >
          Generar Ingreso
        </button>
        )}
          
          <div >
            <br/>
            
          </div>
        </div>
      </div>
      <input onChange={onChangeInput} placeholder="Cuenta a tranferir" />
      <br />
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={Tranfer}
        disabled={account !== NFTs.owner}
      >
        {account !== NFTs.owner ? "No Eres el Dueño" : "Tranferir Token"}
      </button>

      <Link to="/">
        <button className="btn btn-outline-primary btn-sm" type="button">
          Regresar
        </button>
      </Link>
      <br />
      <span>{cuentaTransfer}</span>
    </div>
  );
};

export default NFTs;
