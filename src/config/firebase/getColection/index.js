import { useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase";
import {doc, getDoc } from "firebase/firestore";
import { useWeb3React } from "@web3-react/core";

// const dirTestToken = "0xA533Ee80c221a7F6a54F5b36E03c7EAfE63d50BD";

// Test database, get abi_1

const useGetColection = (id) => {
  const [colec, setColec] = useState();
  
  async function getABI(id) {
    const docRef = doc(db, "ABIS", id);
    const abi1 = await getDoc(docRef);
    const abidb = Object.values(abi1.data());
    // const abidb = Object.values(docSnap.data());
    // const abid = docSnap.data()
    const colection = {
      address: {
        80001: id,
      },
      abi: abidb,
    };
    setColec(colection);
  }
 useEffect(()=>{
  getABI(id)
}, [id]) 

return colec
};

export default useGetColection;
